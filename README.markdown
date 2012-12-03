Exhibit 3.0 Project
==============

Publishing Framework for Large Scale Data-Rich Interactive Web Pages
--------------------------------------------------------------------

Exhibit 3.0 is designed to be a publishing framework for large scale data-rich interactive Web pages, building on the success of the original [Exhibit][1]. This project is a partnership among [MIT Libraries][2], [MIT CSAIL][3] and [Zepheira][4], all with personnel including [SIMILE project alumnus][5], with generous support from the [Library of Congress][6].

To learn more about the Exhibit 3.0 Project, the key requirements for Exhibit 3.0, the team behind the project and how to get involved, please visit [the project homepage][7].

Note that this Github project contains only the "Scripted" mode code.  For the "Staged" mode code, see the [Backstage project][8].

[1]: http://www.simile-widgets.org/exhibit/
[2]: http://libraries.mit.edu/
[3]: http://csail.mit.edu/
[4]: http://zepheira.com/
[5]: http://simile.mit.edu/
[6]: http://loc.gov/
[7]: http://www.simile-widgets.org/exhibit3/
[8]: https://github.com/zepheira/backstage/

---------------------------------------------------------

*Charts Branch*

In this Branch, hopefully we'll be able to

- fix the force diagram branch
- fix the bar graph branch so that it can do vertical bar graphs as well

Then, we have two benchmarks. 

- To create the ability to make similar visualizations as compared to most charting libraries online, so that Exhibit is a valid alternative [currentlyAvailable]

- To add visualizations that conventional charting libraries do not have, or that are typically require a prohibitively strong coding background to implement for the average user [visualTreats]

To the first end (currentlyAvailable), I will try to add:

- pie charts
- line graphs/time series
- improve the scatter plot
- improve bar graphs
- clock

To the second end (visualTreats), I will try to add:

- improvements to the force diagram
- radial chart
- dynamic tree
- treemap
- clock
- bubble chart
- chord diagram
- bullet chart
- chloropleth
- sunburst

Finally, if time permits, I will try to add a vertical timeline extension. 

I will also be attempting to add formatting functionalities to exhibit, specifically, I aim to

- improving the css template so that the default is beautiful
- make some sample theme templates
- add colorbrewer palettes for all charts that have been added
- incorporate stamen map tiles into the map utility

I'll update with the branch names for each of the changes as I go. 