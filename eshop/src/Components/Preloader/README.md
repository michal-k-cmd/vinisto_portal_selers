# Preloader

- loading overlay with spinner
- use with API calls, loading, asynchronous tasks
- `togglePreloader()` method has optional boolean parameter to force show/hide loader

```
import { PreloaderContext } from 'Components/Preloader/context';
...
const preloaderContext = React.useContext(PreloaderContext);
...
preloaderContext.togglePreloader();
```
