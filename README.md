# Moved
Development of Pomf has been moved to https://github.com/pomf/pomf, but the original code will still stay here as well if you fancy this code instead.




# Pomf
Original development environment is Nginx + PHP5.5 + MySQL, but is confirmed to work with Apache 2.4
and newer PHP versions. Should work with any other PDO-compatible database.	

This repo might be a bit out of date seeing as some clones have their own repos which get updated a lot more, however this still works and is the original code.	

# Install	
For the purposes of this guide, we won't cover setting up Nginx, PHP, MySQL,	
Node, or NPM.  So we'll just assume you already have them all running well.	

## Compiling	
The assets are minified and combined using [Grunt](http://gruntjs.com/).	

Assuming you already have Node and NPM working, compilation is easy:	
```	
$ npm install -g grunt-cli	
$ git clone https://github.com/nokonoko/Pomf.git	
$ cd Pomf	
$ npm install	
$ grunt	
```	
After this, the pomf site is now compressed and set up inside `dist/`.	

## Configuring	
The majority of settings are in `static/includes/settings.inc.php`.  Read the 	
comments in that file for more information.	

For file size configuration, there is no server-side verification: we assume 	
that PHP and Nginx/Apache/etc provide ample protection in this department.  There is,	
however, client-side configuration for max size, the `data-max-size` attribute	
on the file input in `pages/upload_form.swig`.	

Make sure to disable PHP from being executed on the file download domain/directory (e.g a.site.com), otherwise a attacker can upload a malicious .php file and execute it on your server.	

# Contact	
I can be contacted via neku@pomf.se or twitter at [@nekunekus](https://twitter.com/nekunekus).
