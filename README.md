<div style="text-align: center;"><img src="http://i.imgur.com/CGV3sgl.png" alt="Wirtual Logo" width="150"></div>


# Wirtual

This library was built as the project of *Next Generation User Interfaces* class at <a href="http://vub.ac.be" target="_new">VUB</a>. Documentation, contribution guide, dependancies and more information coming soon...


## Demo & Documentation

Detailed documentation (and pretty much everything else about this library) could be found <a href="http://oguzgelal.com/wp-content/uploads/2016/12/wirtual.pdf" target="_new">here</a> (*see section 3.3 and 3.4*).

A simple demonstration on this project could be found <a href="https://youtu.be/gSaTBP0ME_A" target="_new">here</a>.


## How to run

All you need to run this library is the `wirtual.js` file in the `dist` directory. Here, how to run the `demo` directory will be explained.

**1)** Clone the library and go in to the root (or download the zip and extract)

```
git clone https://github.com/oguzgelal/wirtual.git
cd wirtual
```

**2)** Copy `wirtual.js` file inside of the `demo` directory

```
cp dist/wirtual.js demo/
```

**3)** Go into the `demo` directory.

```
cd demo
```

**4)** Serve the `demo` directory. There are several ways of doing this: 

<u>With php</u> : Execute below command and go to <a href="http://localhost:8080" target="_new">http://localhost:8080</a> from your browser

```
php -S localhost:8080
```

<u>With python 2</u> : Run the below command and go to <a href="http://localhost:8080" target="_new">http://localhost:8080</a> from your browser

```
python -m SimpleHTTPServer 8080
```

<u>With python 3</u> : Run the below command and go to <a href="http://localhost:8080" target="_new">http://localhost:8080</a> from your browser

```
python -m http.server 8000
```

<u>With ruby</u> : Run the below command and go to <a href="http://localhost:8080" target="_new">http://localhost:8080</a> from your browser

```
ruby -run -e httpd . -p 8080
```

<u>With node</u> : First install the dependency:

```
npm install -g http-server
```

Then run the below commands and go to <a href="http://localhost:8080" target="_new">http://localhost:8080</a> from your browser

```
http-server -p 8000
```

Any other method which would serve the demo directory should work fine. And after doing that, html files in the demo directory could be visited.


## Contrinution guide

Coming soon...


## Shoutout

<img src="https://www.browserstack.com/images/layout/browserstack-logo-600x315.png" style="width: 300px;" />

Special thanks to BrowserStack for supporting this opensource project and for all the contributions to the opensource society.


## Contact

Oguz Gelal - <a href="mailto:oguz.gelal@vub.be">oguz.gelal@vub.be</a>