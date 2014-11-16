mailbox
=======

### usage (<a href="http://jsfiddle.net/leo/k1rusqqq/3/embedded/result/" target="_blank">demo</a>)

To use beautiful contact forms in your project, you don't need to do anything else than to just include all files and initialize the main-script. You can download the minified versions from the lower links.

**Download:**
<a href="https://rawgit.com/leo/mailbox/master/jquery.mailbox.min.js">JS (minified)</a>,
<a href="https://rawgit.com/leo/mailbox/master/mailbox.min.css">CSS (minified)</a>,
<a href="https://rawgit.com/leo/mailbox/master/mailbox.php">PHP</a>.

After downloading and including the scripts in your site, you need to load them - of course (preferably right before the 'body'-tag is closed):

```html
<link rel="stylesheet" type="text/css" href="mailbox.css" />
<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
<script src="jquery.mailbox.js"></script>
```

**Important:** Please make sure that you've either placed the PHP-script in the same directory as the JS-script or set the right path to the file in the configuration.


After loading all scripts on your site, just initialize mailbox and you're finished! :)

```js
$( document ).mailbox();
```

Please note: 'document' stands for an object that contains mailto-links (you can simply replace it with a nother object, e.g. '.container').


### configuration

Mailbox is designed to adapt to many kinds of possible requirements. To change the default settings, you simply need to pass the corresponding parameters through JS:

```js

$( document ).mailbox({

	send: 'Send message',
	success: 'Message sent successfully!',
	
	labels: {
		name: 'Your name',
		email: 'Your email',
		subject: 'Subject',
		body: 'Your message'
	},
	
	script: 'mailbox.php',		// path to the PHP-script
	complete: function() {}		// a function to be executed after a mail has been sent
	
});

```

I need to thank the guys from shipp.co for creating such a beatiful project (<a href="https://balloon.io" target="_blank">balloon.io</a>). It helped me to shape the looking of mailbox to something great.

License: <a href="http://www.wtfpl.net/"><img src="http://www.wtfpl.net/wp-content/uploads/2012/12/wtfpl-badge-4.png" width="80" height="15" alt="WTFPL" /></a>
