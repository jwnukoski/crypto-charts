const Enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')
require('dotenv').config()
Enzyme.configure({ adapter: new Adapter() })
