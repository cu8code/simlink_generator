# simlink_generator

simlink_generator is a tool that can read json files and generate symbolic links 
based on the specified parameters. It can handle multiple sources and destinations.
simlink_generator can also check for existing links. To use simlink_generator, you need to 
provide a json file that contains the following keys: source, destination.
The source and destination values can be either strings or lists of strings, representing the paths 
of the files or directories to be linked.
simlink_generator will then read the json file and create the symbolic links accordingly.
