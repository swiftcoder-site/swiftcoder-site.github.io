



### The app implementation

First, we need to create the interface for our reposiotry that provides us the temperature for given location.
In order to make the app more testable we will use the protocol defined below across the whole app instead of a class name that points to the final implementation.

```swift
protocol TemperatureProviding {
    func temperature(for location: CLLocation, result: (Float64) -> Void)
}
```

`TemperatureProvider` is the class that implements the real api calls and operates on real data, but the app will not use it directly in order to have possibility to mock the data repository.

```swift
protocol TemperatureProvider: LoggerProviding {
    func temperature(for location: CLLocation, result: (Float64) -> Void)
        // requesting the temperature from backend or whatever 
    }
}
```

Every time when we want to use repository we need to inject it into the class using `@Injected` property wrapper. The point of it is that the `TemperatureProvider` user does not know the target implementation and not even care.  

```swift
struct TemperatureViewModel {
    @Injected(\.temperatureProvider) var temperatureProvider: TemperatureProvider
    
    func loadData() {
        let location = CLLocation(latitude: 49.9683988, longitude: 20.7260966)
        temperatureProvider.temperature(for: location, result: { temperature in
            print("temperature is: \(temperature)")
        }
    }
}
```

### Define dependency

1st step: Depencency injector uses `InjectionKey` to register depencencies. It stores in the static property a currenct value for every key type (see next chapter to see implementation)

Every class that is injected has to implement key and current value like this:

```swift
private struct TemperatureProviderKey: InjectionKey {
    static var currentValue: TemperatureProviding = TemperatureProvider()
}
```

2nd step: Extend `InjectedValues` and add propetry to it. It will link the exact `InjectionKey` implementation with the property. The property wrapper called like this `@Injected(\.temperatureProvider)` will take the pey path, access `InjectedValues` and use keypath on it, and the getter of an injected propeperty will extract value from `InjectionKey`.

``` swift
extension InjectedValues {
    var temperatureProvider: TemperatureProviding {
        get { Self[TemperatureProviderKey.self] }
        set { Self[TemperatureProviderKey.self] = newValue }
    }
}
```
- `InjectedValues[\.temperatureProvider] = MockedTemperatureProvider()`

### Implementation of dependency injector

Let's define the protocol that defines the `InjectionKey` that holds current value

```swift
public protocol InjectionKey {
    associatedtype Value
    static var currentValue: Self.Value { get set }
}
```

Here is how `InjectedValues` is defined. 

```swift
struct InjectedValues {
    private static var current = InjectedValues()
    private init() {}
    
    static subscript<K>(key: K.Type) -> K.Value where K : InjectionKey {
        get { key.currentValue }
        set { key.currentValue = newValue }
    }
    
    static subscript<T>(_ keyPath: WritableKeyPath<InjectedValues, T>) -> T {
        get { current[keyPath: keyPath] }
        set { current[keyPath: keyPath] = newValue }
    }
}
```

and there is definition of the property wrapper

```swift
@propertyWrapper
struct Injected<T> {
    private let keyPath: WritableKeyPath<InjectedValues, T>
    var wrappedValue: T {
        get { InjectedValues[keyPath] }
        set { InjectedValues[keyPath] = newValue }
    }
    
    init(_ keyPath: WritableKeyPath<InjectedValues, T>) {
        self.keyPath = keyPath
    }
}
```

