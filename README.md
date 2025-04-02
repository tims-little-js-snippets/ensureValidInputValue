# Ensure Valid Input Value

This function ensures the target input(s) retain a value that matches a given RegEx expression.

## Usage

In order to register a target/series of targets, call the function `ensureValidInputValue` with the following parameters:

### Required

Required parameters are given individually in the function arguments.

- `selector`
  - String
  - A CSS selector targeting the element or elements you would like to attach this function's logic to.
- `matcher`
  - RegEx
  - A Regular Expression denoting the valid pattern for this input's value.

### Optional

Optional parameters are given in a final optional object as named properties of that object.

- `parent`
  - Element
  - Default: `document`
  - An element to search for the selector within.
- `validationMessage`
  - String
  - Default: `"Invalid input."`
  - The message to show on the element if it's invalid.

## Functionality

- On initialization of functionality:
  - If a targeted element is not an input, throw an error for that input.
  - If a targeted element is already registered, throw an error for that input.
  - Cache the initial value of input.
  - Attach event listeners to the input.
- On input change of the input:
  - If input's value is valid, update input's cache with new value.
  - If input's value is invalid, mark as invalid.
- On blur of the target inputs:
  - If input's value is invalid, revert to cached value.

## Standards

This project meets the following standards as set forth by Tim's Little JS Snippets:

- All functionality is contained in one simple function.
- All functionality is clearly and simply documented in this README file.
- This function returns an object with member functions allowing for the following:
  - Removal of functionality.
  - Disabling of functionality.
  - Enabling of functionality.
  - Toggling of functionality.
- All code is written in plain JavaScript.
- All parameters are evaluated for validity and simple, descriptive errors are thrown in the case of an invalid parameter.
