# sfdx-forrest

an easy way to migrate data between environments using sfdx cli

## Install

```
yarn
```

## Setup / config

clone the `.example.env` and edit the values

#### Setup the fields you want to query

create `./scripts/OBJECT_NAME-fields.json` and build out your array of fields

```
{
  "fields": [
    "Id",
    "Name",
    "RecordType.Name",
    "RecordType.DeveloperName"
  ]
}
```

## Run

~~Base script.~~

~~Will run everything within the process.~~

```
// yarn ns
```

~~Individual parts of the process can be run using the `ns:*` prepended scripts.~~

For now, you must manually run the individual scripts of the process. Future development will build this out into one command to run (after setting up .env + \*-fields.json files);
