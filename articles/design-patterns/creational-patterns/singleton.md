# Singleton

Singleton is a design pattern that give a way to get global access to instance of a class, and make sure there is only one of instace of it.

Steps to achieve this:

- Make constructor private
- Create static varible

Let's look at the example:

```swift
class ApiClient {
    static let shared = ApiClient()
    private init() {

    }
}
```

Now, we can access the instance of `ApiClient` by `ApiClient.shared`.