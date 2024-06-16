# DemoApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Answers

**1.** There are a couple of things wrong with the token. After decoding it, the value of the `valid_until` property is in the past, which technically makes this token safe to use but useless. The second issue with this property is its format. Not only is it in a non-conventional format, but it should also be represented as a Unix timestamp (number). While it is up to us what data we keep in the JWT payload, according to the RFC 7519 standard, the expiration time should be kept under the `exp` key. Lastly, the `sub` property stores the user's email. A better practice would be to store a unique user ID (e.g., UUID) there. If the token gets leaked, the email address could be exposed, which could not only violate data protection regulations (emails are often considered personally identifiable information) but also be used as a vector for cyber attacks.

**2.** Attack vectors and mitigation methods:

**HTML Injection**

- Sanitize and validate user inputs.
- Use a whitelist of allowed HTML tags and attributes.
- (If possible) Use safer JavaScript methods like innerText instead of innerHTML.

**Cross-Site Scripting**

- Implement CSP to restrict where scripts can be loaded from.
- Use libraries like DOMPurify to sanitize input by removing or escaping dangerous characters.
- Encode data before rendering it on the web page.

**3.** The difference between mutable and immutable objects is in their ability to change state or content. Unlike immutable objects, mutable objects can be modified after they are created.

In JavaScript, all primitive values are immutable.

**Pros of Immutability:**

- Performance improvement (if implemented efficiently).
- Reduced memory use.
- Thread-safety.
- Predictability.

**Cons of Immutability:**

- Poor performance (if implemented inefficiently).
- Cyclic data structures, such as graphs, are difficult to build.

To achieve immutability in our own code, we can:

- Use const for variables. It ensures no change to the object reference, although it does not make the object itself immutable.
- Use Object.freeze() to make an object immutable by preventing any changes to its properties, but note that it does not apply to nested objects.
- Use libraries or helper functions to enforce immutability, such as Immutable.js.
- Use built-in methods like map, filter, and reduce to create new arrays instead of modifying existing ones.

**4.** There are many things that can be done to speed up the loading of a web application, such as:

- Optimize asset sizes.
- Make the first bundle as small as possible (e.g., lazy-loading).
- Configure the server and leverage the Cache-Control and ETag headers.
- Use a CDN.
- Limit the change detection triggering and the amount of DOM updates, creations, or deletions.
- Defer the loading of select dependencies (e.g., elements outside the viewport).
