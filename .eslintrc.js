module.exports = {
  extends: [
    'eslint:recommended',     
    'prettier'              
  ],
  plugins: [
    'prettier'                
  ],
  parserOptions: {
    ecmaVersion: 2020,         
    sourceType: 'script'       
  },
  env: {
    browser: true,             
    node: true,                
    es6: true                 
  },
  rules: {
    'prettier/prettier': 'error', 
    'no-console': 'warn',         
    'no-unused-vars': 'warn',     
    'eqeqeq': 'error'            
  }
};



