const current_dir = __dirname
const file_name = "sss.json"
const fsp = require("fs/promises")
const fs = require("fs")

/**
 * 
  * creates simlink
  * @param {"file"|"dir"} type
  * @param {string} object_location 
  * @param {string} simlink_location
  * @return {void}
 */
async function create_simlink(type, object_location, simlink_location) {
  if (type === "dir") {
    await fsp.symlink(object_location, simlink_location, type)
  }
  if (type === "file") {
    await fsp.symlink(object_location, simlink_location, type)
  }
}


/**
 * take the config_path, and return js object
  * @param {string} path
  * @return {any}
 */
async function get_config(path) {
  let data;
  try {
    data = await fsp.readFile(path, "utf8")
  } catch (e) {
    console.log("please make sure %s file exists", file_name);
  }
  return await JSON.parse(data)
}


function verify_if_exists(data) {
  const i = Object.keys(data)
  if (!fs.existsSync(current_dir + "/" + i)) {
    throw new Error("%s directroy dose not exists", i)
  }
}


(async function() {
  const conf = await get_config(current_dir + "/" + file_name)
  for (const i of conf.list) {
    verify_if_exists(i)
  }

  for (const i of conf.list) {
    const name = Object.keys(i)[0]
    const lstat = fs.lstatSync(name)
    if (lstat.isDirectory()) {
      create_simlink("dir", current_dir + name, i[name])
    } else if (lstat.isFile()) {
      create_simlink("file", current_dir + name, i[name])
    }
  }
})()
