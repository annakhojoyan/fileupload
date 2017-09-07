'use strict';

const router = require('express').Router();
const config = require('../config/config');
const mongoose = require("mongoose");
const fs = require("fs");

let Grid = require("gridfs-stream");
let conn = mongoose.connection;
Grid.mongo = mongoose.mongo;  

module.exports = router; 
