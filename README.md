# Proofer

Proofer is a handy Chrome Extension that proof reads your writing. Helping you eradicate grammatical and spelling errors.

**Demo: http://quick.as/noooil6l**

## Installation.
[Follow the instructions on the release page](https://github.com/cameronmaske/proofer/releases/tag/0.0.1).

## Usage.
Hit `Ctrl + T` to have proofer read.

If you have a selection already, proofer will just read that.

Otherwise, it will automatically select and read the current sentence your cursor is in.

## Current Limitations.
* Not published on the Chrome Store (yet!).
* Can't reconfigure the activation hotkey (currently Ctrl + T).
* Doesn't currently work with Google Docs. Google Doc's custom rich text engine (called Kix) eschews the browser's native capabilities, including selection handling.

## Have a feature request or noticed a bug?

Please submit an issue.

## Contributing.

Want to help develop Proofer? Here are the steps to get you started.

1. [Install Fig + Docker.](http://orchardup.github.io/fig/)
2. Fork this repo to your username.
3. Clone it to your local machine `git clone git@github.com:[YOUR_USERNAME]/proofer.git`
4. Enter the local directory `cd proofer`.
5. Run the development enviroment setup `bash script/setup`.
6. Open Chrome, go to the Extension page `chrome://extensions/` and enable Developer Mode. Click `Load unpacked extension` and navigate it to the `/addon` folder then hit  `Select`.
7. Run the development task runner `fig up`. Open Chrome and start developing! Any changes to the addon should automatically reload.
8. Once you are happy with your changes, commit, push to GitHub and submit a pull request.
9. Congratulate yourself on being awesome by contributing.