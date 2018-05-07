module.exports = {
    "extends": "google",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "env" : {
        "browser": true,
        "node" : true,
    },
    "rules": {
        "semi": ["error", "always"],
        "require-jsdoc" : "off",
        "linebreak-style":"off"
    }
};