# diction.help

A contemporary, single page web application for creating and sharing footnotes from a variety of API's - including Oxford Dictionary and Wikipedia.

<i><a href="http://diction.help">diction.help</a></i>

## Purpose

Mainly a continuing AngularJS and Rails learning experiment, but also used to help learn new vocabulary and information through the indexation of data served from Oxford Dictionary and Wikipedia. The Wikipedia API data provides article summary blurbs with links to the main articles.

## Settings

All index searches are temporary sessions on the client-side; if you leave or refresh the page, the data will be lost. To save lists, you must create an account.

Features:

* Create, save, and share footnotes from a variety of API's (Oxford Dictionary, Wikipedia)
* Get a shareable URL for a list
* Search for multiple words simultaneously through comma separation: "epitome, fallacy, aloof"
* Target specific API's in search using a parameter
  * Wikipedia: "cell biology (w)"
  * Oxford Dictionary: "epitome (d)"
* Various filtering and sorting options

## Architecture

Front-end: 	AngularJS 1.2.19<br>
Back-end:	Ruby on Rails 4.2

## Cloning

To get up and running locally...

> git clone https://github.com/kylesb/diction.help.git<br>
> bundle update<br>
> rake db:migrate<br>
> rails s
