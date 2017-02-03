const _ = require('lodash')
const chalk = require('chalk')
const Generator = require('yeoman-generator')
const path = require('path')
const yosay = require('yosay')

module.exports = class extends Generator {

  initializing () {
  }

  prompting () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the prime ' + chalk.red('polymer-app') + ' generator!'
    ))

    var prompts = [
      {
        type: 'input',
        name: 'collectionName',
        message: 'Which will be the name of your new collection?',
        default: 'app'
      },
      {
        type: 'confirm',
        name: 'withDemoPage',
        message: 'Would you like a demo page in it?',
        default: true
      }
    ]

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer
      _.merge(this.props, props)
    })
  }

  configuring () {
    this.config.save()
  }

  writing () {
    this.fs.copyTpl(
      this.templatePath('demo.html'),
      this.destinationPath(
        path.join(this.props.paths.src, this.props.collectionName, 'demo.html')
      ),
      this.props
    )
  }

  install () {
    this.installDependencies()
  }
}
