Copy-on-Write is a mechanizm that allocates memory for the copied object only wnen the copy has been modified

[https://betterprogramming.pub/understand-copy-on-write-in-swift-5-52a4716165a3]()

```swift
final class Ref<T> {
	var val : T
	init(_ v : T) {val = v}
	
	}

struct Box<T> {
	var ref : Ref<T>
	init(_ x : T) { ref = Ref(x) }
	var value: T {
		get { return ref.val }
		set {
			if (!isKnownUniquelyReferenced(&ref)) {
				ref = Ref(newValue)
				return
			}
			ref.val = newValue
		}
	}
}
```