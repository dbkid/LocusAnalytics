The first thing I did when presented with this dataset was to try to understand what the data meant. Through looking at your website and additional research on Google I was able to get a general sense of the meaning behind the syntax.

Because the point of the data is to group the companies according to function, I thought the best way to present it would be to display the different groupings that occur at the different levels of specificity contained in the syntax.

I was able to deduce with a high level of certainty all of the possible categorizations and levels of specificity on the activity axis (for example, 1, 1.1, 1.1.1), so on that axis I included all possible categories and specificity levels (not just the ones I received data for).

I was less certain about all of the possible categorizations and specificity levels on the resource axis, so on that axis I only included the top level categories included in the dataset (B, F, etc) and the most specific categories included in the dataset (B3iii, etc). In other words, the resource axis is missing (I think) a middle level of specificity (for example, B4), and, additionally, there are no places on the axis for categories in the schema that I did not receive data for (for example, B2iii). This is not ideal, but I thought it a better solution than including incorrect categories and potentially distorting the data. I tried to order the resource axis in a way that I thought made sense, but I am not certain about the ordering.

If I had more time I would:
- Fix the spacing of the display: if there are a lot of companies at a particular locus, the bubble will get too big and cover up smaller neighboring bubbles.
- Include company names in the visualization: this could be accomplished fairly easily by including the company names in the data groupings and then listing them in the tooltip that pops up when you mouse over each bubble.
- Associate the bubble fill color with the associated resource and the bubble border color with the associated activity (as of now the colors are randomly generated).

How to run:
- Clone the repository and navigate into it in your terminal.
- Run "npm install http-server" in your terminal.
- Run "http-server" in your terminal.
- Go to http://localhost:8080/ in your browser.
