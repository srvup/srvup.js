# srvup.js

The official srvup javascript client. Useful for API calls and UI elements.

[![NPM](https://img.shields.io/npm/v/srvup.svg)](https://www.npmjs.com/package/srvup) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save srvup
```
## [Docs](https://docs.srvup.com)

## Basic Usage
Read the [docs](https://docs.srvup.com) for more.

#### `GET` requests
```jsx
import React, { Component } from 'react'

import srvup from 'srvup'
srvup.api(API_PUBLIC_KEY)

class Example extends Component {
    handleResponse = (responseData, status) =>{
        console.log(responseData, status)
        // set your state here
    }


    componentDidMount(){
        const includeUserAuthToken = false
        srvup.get('/posts/', this.handleResponse, includeUserAuthToken)
    }

    render () {
        return (
          <h1>Srvup Client<h1>
        )
    }
}
```


## License

MIT © [srvup](https://github.com/srvup)
