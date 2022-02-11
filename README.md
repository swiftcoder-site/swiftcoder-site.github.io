
# installation 

ln -s /Users/artur/Workspace/projects/swiftcoder/bin/docapp-gen ~/.local/bin

### Build app for debugging

docapp-gen -tmulti -i ./articles -o ./docs

### Build single file website

docapp-gen -tsingle -i ./articles -o ./docs/index.html