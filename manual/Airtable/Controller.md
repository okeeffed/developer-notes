---
name: Controller
menu: Airtable 
---
# Airtable Controller

Use this as a controller to fetch requests from the Airtable API

## Requirements

```
yarn add --dev airtable
```

Ensure that you have `.env` and the following added:

```
AIRTABLE_API_KEY=
AIRTABLE_BASE=
```

## TOC

- [Airtable Controller](#airtable-controller)
    - [Requirements](#requirements)
    - [TOC](#toc)
    - [Functions](#functions)
    - [retrieveAll([baseName], [view])](#retrieveallbasename-view)
    - [retrieve([baseName], [view])](#retrievebasename-view)
    - [retrievePage([baseName], [view], [pageSize])](#retrievepagebasename-view-pagesize)
    - [create(entry, [baseName])](#createentry-basename)

## Functions

<dl>
<dt><a href="#retrieveAll">retrieveAll([baseName], [view])</a></dt>
<dd>
<p>Retrieve data from a table on Airtable</p>
</dd>
<dt>
<a href="#retrieve">retrieve([baseName], [view])</a></dt>
<dd><p>Retrieve data from a table on Airtable</p>
</dd>
<dt>
<a href="#retrievePage">retrievePage([baseName], [view], [pageSize])</a></dt>
<dd><p>Retrieve a particular page</p>
</dd>
<dt>
<a href="#create">create(entry, [baseName])</a></dt>
<dd><p>Create a new entry to a base</p>
</dd>
</dl>


## retrieveAll([baseName], [view])

Retrieve data from a table on Airtable

**Kind**: global function  

| Param | Type | Default |
| --- | --- | --- |
| [baseName] | <code>*</code> | <code>&#x27;Table 1&#x27;</code> | 
| [view] | <code>string</code> | <code>&quot;&#x27;Grid view&#x27;&quot;</code> | 


## retrieve([baseName], [view])

Retrieve data from a table on Airtable

**Kind**: global function  

| Param | Type | Default |
| --- | --- | --- |
| [baseName] | <code>*</code> | <code>&#x27;Table 1&#x27;</code> | 
| [view] | <code>string</code> | <code>&quot;&#x27;Grid view&#x27;&quot;</code> | 


## retrievePage([baseName], [view], [pageSize])

Retrieve a particular page

**Kind**: global function  

| Param | Type | Default |
| --- | --- | --- |
| [baseName] | <code>*</code> | <code>&#x27;Table 1&#x27;</code> | 
| [view] | <code>string</code> | <code>&quot;&#x27;Grid view&#x27;&quot;</code> | 
| [pageSize] | <code>number</code> | <code>10</code> | 


## create(entry, [baseName])

Create a new entry to a base

**Kind**: global function  

| Param | Type | Default |
| --- | --- | --- |
| entry | <code>*</code> |  | 
| [baseName] | <code>*</code> | <code>&#x27;Table 1&#x27;</code> | 

