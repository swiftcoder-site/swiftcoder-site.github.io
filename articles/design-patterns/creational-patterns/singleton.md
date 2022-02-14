# Singleton

Singleton is a design pattern that gives a way to get the global access to an instance of a class and make sure there is only one instace of it.

Steps to achieve this behaviour:

- Make constructor private
- Create static varible

Let's look at the example:

``` swift
class ApiClient {
    static let shared = ApiClient()
    private init() {

    }
}
```

Now, we can access the instance of `ApiClient` by `ApiClient.shared`.

Here is version with lazy initialisation.

```swift
class ApiClient {
    // NOTE: Static veribles do not need lazy keywoard
    static var shared: ApiClient = {
        ApiClient()
    }()

    private init() {

    }
}
```