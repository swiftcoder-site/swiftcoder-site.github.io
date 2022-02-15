
First step is to define how to get the theme and apply it. We use here [dependency injection](/testing/dependency-injection/).
```swift
struct LightBackgroundColorModifier: ViewModifier {
    @Injected(.theme) private var theme
    func body(content: Content) -> some View {
        content
            .background(Color(theme.lightColor))
    }
}
```

And here we are adding extension to View to have convenience in invoking the view modifier.

```swift
extension View {
    func lightBackground() -> some View {
        modifier(LightBackgroundColorModifier())
    }
}
```

When you build views now you just simply use the `lightBackground` method.

```swift
Text("Tile")
    .lightBackground()
```