# Simple coverflow component for react
[Demo](https://droganov.github.io/react-minimal-coverflow/)

## Example
```javascript
import Coverflow, { Image } from 'react-minimal-coverflow';

const Demo = ({ cover }) => (
  <Coverflow>
    <Image cover={cover} src="src-1" />
    <Image cover={cover} src="src-2" />
    <Image cover={cover} src="src-3" />
    <div>
      It can be anything here
    </div>
  </Coverflow>
);


render(<Demo cover />, document.getElementById('app'));
```

### Credits
[Markus Englund](https://github.com/markusenglund) and his [react-npm-component-starter](https://github.com/markusenglund/react-npm-component-starter)
