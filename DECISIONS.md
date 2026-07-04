# Decisions

## State Management

I used React Context API for cart management because the cart data is needed in multiple components such as the product page, navbar, and cart drawer.

I could have used useState and passed data through props, but that would have required passing props through multiple component levels. Context API made it easier to access and update cart data from anywhere in the application without prop drilling.

I did not use Redux because the application is relatively small and Context API was enough for the current requirements.

## Product Variants in URL

I stored the selected colour and size in the URL query parameters. This allows users to refresh the page or share the link without losing their selected variant.

## Local Storage

Cart data is saved in localStorage and restored when the application loads. This ensures that cart items are not lost after a page refresh.

## What I Would Improve With More Time

If I had more time, I would add unit tests for variant selection and cart functionality.

I would also spend more time improving Lighthouse performance by optimizing images and reducing unnecessary re-renders.

Some components could also be split into smaller reusable components to make the code easier to maintain as the application grows.