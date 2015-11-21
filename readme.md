# diction.help

An AngularJS and Rails single-page web-application for creating and sharing vocabulary lists. 

http://diction.help

## Settings

All index searches are temperary sessions on the client-side, which means if you refresh the page, the data will be lost. In order to save and share lists, you must log-in or create an account. 

Features:

* Create and save vocabulary lists
* Get public sharable link for any given list
* Search for multiple words simultaneously through comma seperation (e.g. epitome, fallacy, aloof) 
* Filter words by title, speech, or definition keywords (e.g. adj, noun, 'aloof')
* Configure word order through drag and drop using the 'custom order' sort option

## Purpose

I created this project as a means of helping to expand my vocabulary. Usually, when I come across unfamilar words in a journal or novel, I'll take the time to look them up and add them to a text document. This tool helps organize large collections (i.e. lists) of words through several sorting and filtering options, making it more pragmatic and accessible than a standard text document. 

## Architecture

Data source: Oxford Dictionary API<br>
Front-end: 	AngularJS 1.2.19<br>
Back-end:	Ruby on Rails 4.2


## Cloning

To get up and running locally...

> git clone https://github.com/kylesb/diction.help.git<br>
> bundle update<br>
> rake db:migrate<br>
> rails s