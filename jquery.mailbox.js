/*
	Mailbox 3
	Copyright 2014 Leonard Lamprecht - https://github.com/leo/mailbox
	License: http://opensource.org/licenses/mit-license.php
*/

(function ($) {

    $.fn.mailbox = function (settings) {

        var config = {
            'send_text': 'Send message',
            'success_text': 'Your message has been sent successfully!',
            'label': {
                'name': 'name',
                'email': 'e-mail',
                'subject': 'subject',
                'message': 'message'
            },
            'send_url': 'mb_send.php',
            'complete': null
        };

        if (settings) {
            $.extend(config, settings);
        }

        var div = '#mailbox';

        function open(link_id, to, cc, bcc, subject, body) {

            if (typeof subject !== 'undefined' && subject !== false) {
                $(div + ' input[name="subject"]').val(subject);
            }

            if (typeof body !== 'undefined' && body !== false) {
                $(div + ' textarea').val(body);
            }

            if (typeof cc !== 'undefined' && cc !== false) {
                var cc = false;
            }

            if (typeof bcc !== 'undefined' && bcc !== false) {
                var bcc = false;
            }

            $(div).attr('class', 'on_ma_way');

            $(div + ' input[name="sess_id"]').attr('value', link_id);

            $(div).animate({
                right: '0'
            }, 300, function () {
                $(div).attr('class', 'open');
            });

        }

        function close() {

            $(div).attr('class', 'on_ma_way');

            var mailbox_width = $(div).css('width');
            var mailbox_overflow = '-' + mailbox_width;

            $(div).animate({
                right: mailbox_overflow
            }, 300);
            $(div + ' .success').fadeOut(200);

            setTimeout(function () {
                $(div + ' form').fadeIn(200);
            }, 250);

            setTimeout(function () {
                $(div + ' label[for="name"]').html(config.label.name);
                $(div + ' label[for="email"]').html(config.label.email);
                $(div + ' label[for="subject"]').html(config.label.subject);
                $(div + ' label[for="message"]').html(config.label.message);

                $(div + ' input[type="text"], ' + div + ' textarea').removeAttr('disabled');
                $(div + ' .send').html(config.send_text);
                $(div + ' input[name="name"]').val('');
                $(div + ' input[name="email"]').val('');
                $(div + ' input[name="subject"]').val('');
                $(div + ' textarea').val('');

                $(div).attr('class', 'closed');
                $(div + ' input[type="hidden"]').removeAttr('value');
                $(div + ' label.warning').removeClass('warning');
            }, 500);

        }

        $(this).each(function () {

            var temp_sess_id = '';
            var temp_sess_id_salt = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

            for (var i = 0; i < 10; i++)
                temp_sess_id += temp_sess_id_salt.charAt(Math.floor(Math.random() * temp_sess_id_salt.length));

            $(this).attr('data-mail-id', temp_sess_id);

            var href = $(this).attr('href');

            if (href.indexOf(',') > -1) {
                if (href.indexOf(', ') > -1) {} else {
                    console.warn('The e-mail addresses in the mailto-links should be seperatet with a comma + space (e.g. "hi@test.net, ho@test.org").');
                }
            }

            if (href.indexOf('@') > 6) {

                if (href.indexOf('?') > 6) {

                    var _email = href.substr(0, href.indexOf('?'));
                    var receiver = _email.split('mailto:')[1];

                } else {

                    var receiver = href.split('mailto:')[1];

                }

                if (href.indexOf('?') > 6) {

                    var all_after_email = href.split('?')[1];

                    var fir_attr = all_after_email.split('&')[0];
                    if (typeof fir_attr === 'undefined') {
                        var fir_attr = '-';
                    }

                    var sec_attr = all_after_email.split('&')[1];
                    if (typeof sec_attr === 'undefined') {
                        var sec_attr = '-';
                    }

                    var thi_attr = all_after_email.split('&')[2];
                    if (typeof thi_attr === 'undefined') {
                        var thi_attr = '-';
                    }

                    var fou_attr = all_after_email.split('&')[3];
                    if (typeof fou_attr === 'undefined') {
                        var fou_attr = '-';
                    }


                    if (fir_attr.indexOf("body") == 0) {
                        var body = fir_attr.split('body=')[1];
                    }

                    if (fir_attr.indexOf("subject") == 0) {
                        var subject = fir_attr.split('subject=')[1];
                    }

                    if (fir_attr.indexOf("cc") == 0) {
                        var cc = fir_attr.split('cc=')[1];
                    }

                    if (fir_attr.indexOf("bcc") == 0) {
                        var bcc = fir_attr.split('bcc=')[1];
                    }


                    if (sec_attr.indexOf("body") == 0) {
                        var body = sec_attr.split('body=')[1];
                    }

                    if (sec_attr.indexOf("subject") == 0) {
                        var subject = sec_attr.split('subject=')[1];
                    }

                    if (sec_attr.indexOf("cc") == 0) {
                        var cc = sec_attr.split('cc=')[1];
                    }

                    if (sec_attr.indexOf("bcc") == 0) {
                        var bcc = sec_attr.split('bcc=')[1];
                    }


                    if (thi_attr.indexOf("body") == 0) {
                        var body = thi_attr.split('body=')[1];
                    }

                    if (thi_attr.indexOf("subject") == 0) {
                        var subject = thi_attr.split('subject=')[1];
                    }

                    if (thi_attr.indexOf("cc") == 0) {
                        var cc = thi_attr.split('cc=')[1];
                    }

                    if (thi_attr.indexOf("bcc") == 0) {
                        var bcc = thi_attr.split('bcc=')[1];
                    }


                    if (fou_attr.indexOf("body") == 0) {
                        var body = fou_attr.split('body=')[1];
                    }

                    if (fou_attr.indexOf("subject") == 0) {
                        var subject = fou_attr.split('subject=')[1];
                    }

                    if (fou_attr.indexOf("cc") == 0) {
                        var cc = fou_attr.split('cc=')[1];
                    }

                    if (fou_attr.indexOf("bcc") == 0) {
                        var bcc = fou_attr.split('bcc=')[1];
                    }

                }

                $(this).attr('data-msg-receiver', receiver);

                if (typeof subject === 'undefined') {

                } else {
                    $(this).attr('data-msg-subject', subject);
                }

                if (typeof body === 'undefined') {

                } else {
                    $(this).attr('data-msg-body', body);
                }

                if (typeof cc === 'undefined') {

                } else {
                    $(this).attr('data-msg-cc', cc);
                }

                if (typeof bcc === 'undefined') {

                } else {
                    $(this).attr('data-msg-bcc', bcc);
                }

                $(this).attr('href', '#');

            } else {
                console.error('The href-attribute of one element does not contain a valid mailto-link.');
            }
        });


        $(this).click(function (event) {

            event.preventDefault();

            var link_id = $(this).attr('data-mail-id');
            var receiver = $(this).attr('data-msg-receiver');

            var subject = $(this).attr('data-msg-subject');
            var body = $(this).attr('data-msg-body');

            var cc = $(this).attr('data-msg-cc');
            var bcc = $(this).attr('data-msg-bcc');


            if ($(div).hasClass('closed')) {
                open(link_id, receiver, cc, bcc, subject, body);
            }

            if ($(div).hasClass('open')) {
                close();

                var sess_id = $(div + ' input[name="sess_id"]').val();
                if (link_id != sess_id) {

                    setTimeout(function () {
                        open(link_id, receiver, cc, bcc, subject, body);
                    }, 1000);

                }
            }

        });

        $(document).ready(function () {

            $(div + ' .close').click(function () {
                close();
            });

        });

        var msgbar = '<div id="mailbox" class="closed">' +
            '<span class="close">x</span>' +
            '<form method="post" action="' + config.send_url + '">' +
            '<input type="hidden" name="sess_id">' +
            '<label for="name">' + config.label.name + '</label>' +
            '<input name="name" id="name" type="text" autocomplete="off" >' +
            '<label for="email">' + config.label.email + '</label>' +
            '<input name="email" id="email" type="text" autocomplete="off">' +
            '<label for="subject">' + config.label.subject + '</label>' +
            '<input name="subject" id="subject" type="text" autocomplete="off">' +
            '<label for="message">' + config.label.message + '</label>' +
            '<textarea name="message" id="message" rows="6" ></textarea>' +
            '<button class="send" name="submit" type="submit">' + config.send_text + '</button>' +
            '</form>' +
            '<div class="success">' +
            '<span>&#x2713;</span>' +
            '<p>' + config.success_text + '</p>' +
            '</div></div>';

        $('body').append(msgbar);

        $('#mailbox form').submit(function () {

            var input_name = $(div + ' input[name="name"]').val();
            var input_address = $(div + ' input[name="email"]').val();
            var input_subject = $(div + ' input[name="subject"]').val();
            var input_message = $(div + ' textarea').val();

            function validate_address(email) {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            }

            if (!input_name || !input_address || !validate_address(input_address) || !input_subject || !input_message) {

                if (!input_name) {
                    $(div + ' label[for="name"]').addClass('warning');
                    $(div + ' label[for="name"]').html(config.label.name + ' [!]');
                } else {
                    $(div + ' label[for="name"]').removeClass('warning');
                    $(div + ' label[for="name"]').html(config.label.name);
                }

                if (!input_address || !validate_address(input_address)) {
                    $(div + ' label[for="email"]').addClass('warning');
                    $(div + ' label[for="email"]').html(config.label.email + ' [!]');
                } else {
                    $(div + ' label[for="email"]').removeClass('warning');
                    $(div + ' label[for="email"]').html(config.label.email);
                }

                if (!input_subject) {
                    $(div + ' label[for="subject"]').addClass('warning');
                    $(div + ' label[for="subject"]').html(config.label.subject + ' [!]');
                } else {
                    $(div + ' label[for="subject"]').removeClass('warning');
                    $(div + ' label[for="subject"]').html(config.label.subject);
                }

                if (!input_message) {
                    $(div + ' label[for="message"]').addClass('warning');
                    $(div + ' label[for="message"]').html(config.label.message + ' [!]');
                } else {
                    $(div + ' label[for="message"]').removeClass('warning');
                    $(div + ' label[for="message"]').html(config.label.message);
                }

            } else {

                var sess_id = $(div + ' input[name="sess_id"]').val();

                var receiver = $('a[data-mail-id="' + sess_id + '"]').attr('data-msg-receiver');
                var cc = $('a[data-mail-id="' + sess_id + '"]').attr('data-msg-cc');
                var bcc = $('a[data-mail-id="' + sess_id + '"]').attr('data-msg-bcc');

                if (typeof cc === 'undefined' || cc == false) {
                    var cc = false;
                }

                if (typeof bcc === 'undefined' || bcc == false) {
                    var bcc = false;
                }

                var action_attr = $('#mailbox form').attr('action');

                $.ajax({
                    type: 'POST',
                    url: action_attr,
                    data: {
                        to: receiver,
                        cc: cc,
                        bcc: bcc,
                        name: $(div + ' input[name="name"]').val(),
                        address: $(div + ' input[name="email"]').val(),
                        subject: $(div + ' input[name="subject"]').val(),
                        message: $(div + ' textarea').val()
                    },
                    success: function (echo) {
                        if (echo == 'success') {

                            $(div + ' input[type="hidden"]').removeAttr('value');

                            $(div + ' form').fadeOut(200);

                            setTimeout(function () {

                                $(div + ' .success').fadeIn(200);

                                setTimeout(function () {
                                    if ($.isFunction(config.complete)) {
                                        config.complete.call(this);
                                    }
                                }, 200);

                            }, 250);

                        }

                    }
                });
            }

            return false;

        });

    }

}(jQuery));
