# Webpack Boilerplate

## Clone the repository
```
git clone https://github.com/os-adv-dev/webpack-boilerplate.git
```
After cloning the repository, rename the main folder **webpack-boilerplate** to the project name.


## Install
Install all the dependencies locally
```
npm install --save-dev
```
Initialize webpack. This will prompt for the project details, update the package name with the name for the project and leave the rest empty.
```
npm init
```
Initialize the git repository
```
git init
``` 
Validate the git has no remote address (the following should return no values)
```
git remote -v
``` 
Add your remote git (if applicable)
```
git remote add origin <url.git>
``` 
## Configuring webpack
Open the *webpack.config.js* file and set the `const theme_module` with the name of the theme module.

### Running webpack
Webpack can be used in two way:
1. Building the source files manually everytime we want these
2. Running in server mode, automatically building the files whenever they are saved.

File **package.json** contains the script definitions that can run. This release has a script to run the server. In order to execute it run `npm run start`. 
To just build the files execute the following: `npm run build`

## Considerations
1. This will run locally so loading resources like font files will raise a cross-site request. To avoid this, create a theme on the module just to handle these resources and import them to the scss file.
2. SCSS file allows pure CSS

## Next Steps
1. Review the build for resources (images and other files)
2. Evaluate other plugins
3. Evaluate how to use webpack for JS
