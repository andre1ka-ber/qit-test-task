module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "@vue/airbnb", "@vue/typescript/recommended"],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prefer-const": "error",
    "vuejs-accessibility/form-control-has-label": "off",
    quotes: ["error", "double"],
    "no-param-reassign": "off",
    "max-len": "off",
    "object-curly-newline": "off",
  },
};
