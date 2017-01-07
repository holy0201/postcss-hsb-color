# postcss-hsb-color

Postcss plugin adding hsb() color.

## Installation

`yarn add postcss-hsb-color`

## Usage

Input:

```
body {
    color: hsb(100, 20, 50);
}
```

Output:

```
body {
    color: hsl(100, 20, 50);
}
```

## Option

`postcss( [ hsbcolor({ output: 'rgb' }) ] )`

output: 'rgb', 'hsl'(default)