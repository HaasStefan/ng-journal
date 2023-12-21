---
title: Module Boundaries with Nx
image: https://i.imgur.com/lFJGSso.png
imageAlt: Module Boundaries Cover Image
description: Module boundaries are a great way to enforce architectural rules in your monorepo and manage dependencies. They allow you to define strict boundaries, which can be used to enforce architectural rules and prevent accidental dependencies between modules.
date: 2023-12-21
slug: module-boundaries-with-nx
author:
  image: https://ng-journal.com/assets/portrait-new.png
  imageAlt: Stefan Haas portrait photo
  name: Stefan Haas
  github: HaasStefan
---

# Module Boundaries

Module boundaries are a great way to enforce architectural rules in your monorepo and manage dependencies. They allow you to define strict boundaries, which can be used to enforce architectural rules and prevent accidental dependencies between modules.

But first, let's take a look at the problem we are trying to solve.

## Making the case against `NgModules`

Traditionally, you would structure your Angular application using `NgModules`. Most books, tutorials and guides for beginners will recommend using `NgModules` for encapsulation and lazy loading.
But the encapsulation is not as strong as you might think. You can still access components, services and other classes from other modules. You can even access private members of a class using TypeScript.

Don't believe me? Take a look at this example:

```typescript
// feature.module.ts

import {Component} from "@angular/core";
import {FeatureComponent} from "./feature.component";
import {InternalComponent} from "./internal.component";

@NgModule({
  declarations: [FeatureComponent, InternalComponent],
  imports: [CommonModule],
  exports: [FeatureComponent],
})
export class FeatureModule {}
```

Reading this code, you might think that `InternalComponent` is only used inside the `FeatureModule`. But that's not true. You can still access it from outside the module.
Even though the intention clearly was to only use it inside the `NgModule`, you can still access it by bypassing the `NgModule` and importing it directly through the file system without its compilation context.

```typescript
// dynamic-host.directive.ts

import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dynamicHost]',
  standalone: true
})
export class DynamicHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

```

```typescript
// external.component.ts

import {CommonModule} from "@angular/common";
import {Component, OnInit, ViewChild} from "@angular/core";
import {DynamicHostDirective} from "./dynamic-host.directive";
import {InternalComponent} from "../feature/internal.component";

@Component({
  selector: 'app-external-component',
  standalone: true,
  imports: [CommonModule, DynamicHostDirective],
  template: `
    <!-- This will be dynamically replaced by the InternalComponent -->
    <ng-template dynamicHost></ng-template> 
  `
})
export class ExternalComponent implements OnInit {
  @ViewChild(DynamicHostDirective, {static: true}) dynamicHost!: DynamicHostDirective;

  ngOnInit(): void {
    this.loadComponent();
  }

  private loadComponent() {
    const viewContainerRef = this.dynamicHost.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent(InternalComponent);
  }
}
```

Therefore, `NgModules` are not a good way to enforce architectural rules. They are just a way to group components, services and other classes together, but they don't prevent you from accessing them from outside the module.
If you want to enforce boundaries and hide certain components, services or other classes from the outside world, you need to use a different approach.

This is where **Nx**, **libraries**, **barrel files** and **module boundaries** come into play.

## Barrel files

A barrel file is nothing more than a file which's sole purpose is to export other files. It's a way to group multiple files together and export them from a single file.
So instead of going through the file system and importing each file individually, you can just import the barrel file and get access to all the files it exports.
You will often see these files named `index.ts` or `public-api.ts`.

```typescript
// feature/index.ts

export * from './feature.component';
export * from './feature.module';
```

When you want to import the `FeatureComponent` or `FeatureModule`, you can just import the barrel file instead of importing each file individually.

```typescript
// external.component.ts

import {FeatureModule} from "../feature"; // <-- This will import the barrel file

// ...
```

Ok, sounds good, but why is this useful? Well, when we enforce barrel files as the only way to import files, we can hide certain files from the outside world.
By explicitly disallowing relative imports like `'../../../something.module'`, we always have to import the barrel file.
In this case, the barrel file acts as a private API, which is the only entry point to a module. This way, we can hide certain files from the outside world and prevent accidental imports.

But how do we enforce this? Well, we can use the **@nx/enforce-module-boundaries** rule, but that requires us to create modules at a library level.

## Libraries

Libraries are traditionally used to share code between multiple applications. But inside a monorepository, we do not need to care about distributing and versioning libraries because of the Single Version Policy.
Therefore, there is no hassle in creating libraries and we can use them to enforce architectural rules and module boundaries.

We can simply create an Angular library like this:

```shell
npx nx generate library <libraryName> --directory=<directoryName> --tags=<tags>
```

This will create a library inside the `libs` folder. We can then move our `feature.module.ts`, `internal.component.ts` and `feature.component.ts` into the library and use the already existing barrel file, `'libs/my-lib/src/index.ts'`, to export them.

In order to import the `FeatureModule` and `FeatureComponent`, we now have to import the barrel file instead of importing each file individually. But we cannot simply access it relatively, like `'../../libs/my-lib/src/index.ts'`, because such a relative import could be misused to import other files from the library which are not explicitly exported in the libraries`s entry point, aka the barrel file.

Therefore, Nx always creates a TypeScript path mapping for each library inside the `tsconfig.base.json` file. This allows us to import the barrel file using the `@my-org/my-lib` path. This means, that we can only import from our library using the path mapping, which in the end maps to the barrel file.

```json
// tsconfig.base.json

{
  "compilerOptions": {
    "paths": {
      "@my-org/my-lib": ["libs/my-lib/src/index.ts"]
    }
  }
}
```

Now, we can be sure, that things that are not explicitly exported in the barrel file cannot be imported from the outside world. But what if I want to make sure that my library is only available to certain other libraries? This is where the **@nx/enforce-module-boundaries** rule comes into play.

## `@nx/enforce-module-boundaries`

The **@nx/enforce-module-boundaries** rule allows us to define strict boundaries between libraries. We can define which libraries are allowed to import from which other libraries. This can be done in the `.eslintrc.json` file.

```json
{
  "rules": {
    "@nrwl/nx/enforce-module-boundaries": [
      "error",
      {
        "enforceBuildableLibDependency": true,
        "allow": [],
        "depConstraints": [
          {
            "sourceTag": "scope:user",
            "onlyDependOnLibsWithTags": ["scope:user", "scope:shared"]
          },
          {
            "sourceTag": "scope:contract",
            "onlyDependOnLibsWithTags": ["scope:contract", "scope:shared"]
          }
        ]
      }
    ]
  }
}
```

According to the above configuration, the `"scope:user"` libraries are only allowed to import from `"scope:user"` and `"scope:shared"` libraries. The `"scope:contract"` libraries are only allowed to import from `"scope:contract"` and `"scope:shared"` libraries. Hence, a `"scope:user"` library cannot import from a `"scope:contract"` library and vice versa.
In case someone would try to violate this rule, a linting error would be thrown indicating that the import is not allowed.

But where do these tags actually come from? They do not have any relation to the library name or the folder structure. Instead, they are defined in the `project.json` file which each library and app has. In there you can find a `"tags"` property which you can use to define arbitrary tags for your library or app. In case you have used the tags shown in the example above, you would have to add these tags accordingly in the `project.json` files.

```json
// libs/user/src/project.json

{
  // ...
  "tags": ["scope:user"],
  // ...
}
```

```json
// libs/contract/src/project.json

{
  // ...
  "tags": ["scope:contract"],
  // ...
}
```

```json
// libs/shared/src/project.json

{
  // ...
  "tags": ["scope:shared"],
  // ...
}
```

Now, if you were to import something from the `@my-org/contract` library inside the `@my-org/user` library, you would get a linting error indicating that this import is not allowed.

```plaintext
A project tagged with 'scope:user' can only depend on libs tagged with 'scope:user', 'scope:shared'
eslint(@nx/enforce-module-boundaries) 
```


## Conclusion

Module boundaries at a library level are great for enterprise applications, because of its strong encapsulation and the ability to enforce architectural rules. For one, you can hide certain components, services and other classes from the outside world. And secondly, you can enforce architectural rules by defining strict boundaries between libraries. This way, you can make sure that certain libraries are only used by other libraries which are allowed to use them.

You can use the **@nx/enforce-module-boundaries** rule paired with an architectural approach like the **Enterprise Monorepo Pattern** to build large scale enterprise applications with Nx.

