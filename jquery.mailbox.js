/*
	Mailbox 4 - A contact-form for the new web.
	Made by Leonard Lamprecht - //github.com/leo/mailbox
*/

(function( $ ) {

	$.fn.mailbox = function( custom ) {

		var config = {

			'send': 'Send message',
			'success': 'Your message has been sent successfully!',

			'labels': {
				'name': 'name',
				'email': 'e-mail',
				'subject': 'subject',
				'body': 'message'
			},

			'on': 'mailbox-on',
			'script': 'mailbox.php',

			'viewport': 992,
			'complete': null

		};

		if( custom ) {
			$.extend( config, custom );
		}

		var container = '#mailbox';

		attributes = {

			'to': null,
			'subject': null,
			'body': null,
			'cc': null,
			'bcc': null

		};

		function is( state ) {

			if( $( container ).hasClass( state ) ) {
				return true;
			}

			return false;

		}

		function open( attributes, item ) {

			$.each( attributes, function( attribute, value ) {

				if( value != null ) {

					$( container ).find( '[name="' + attribute + '"]' ).val( value );
					$( container ).data( attribute, value );

				}

			});

			$( container ).attr( 'class', 'open' );

			$( '.' + config.on ).removeClass( config.on );
			$( item ).addClass( config.on );

		}

		function close( state, callback ) {

			$( container ).attr( 'class' , 'closed' );
			$( '.' + config.on ).removeClass( config.on );

			var transition = $( container ).css( 'transition-duration' );

			setTimeout( function() {

				$.each( attributes, function( attribute, value ) {

					$( container ).removeData( attribute );

				});

				$( container ).find( '.success' ).fadeOut( 200, function() {

					$.each( config.labels, function( index, title ) {

						$( container ).find( 'label[for="' + index + '"]' ).html( config.labels[title] );
						$( container ).find( 'input[type="text"], textarea' ).removeAttr( 'disabled' ).val('');
						$( container ).find( '.warning' ).removeClass( 'warning' );

					});

					$( container ).find( 'form' ).fadeIn( 200, function() {

						if( state == 1 && $.isFunction( callback ) ) {
							callback();
						}

					});

				});

			}, transition.replace( 's', '' ) * 1000 );

		}

		function bag() {

			var content = '<aside id="mailbox" class="closed"><span class="close">x</span>';
			content += '<form method="post" action="' + config.script + '">';

			$.each( config.labels, function( key, title ) {

				content += '<label for="' + key + '">' + title + '</label>';

				if( key !== 'body' ) {

					content += '<input name="' + key +'" id="' + key +'" type="text" autocomplete="off" />';

				} else {

					content += '<textarea name="body" id="' + key + '" rows="6" ></textarea>';

				}

			});

			content += '<button class="send" name="submit" type="submit">' + config.send + '</button>';
			content += '</form><div class="success"><span>&#x2713;</span><p>' + config.success + '</p></div></aside>';

			return content;

		}

		$( 'body' ).append( bag );
		$( container ).find( '.close' ).click( close );

		$( this ).find( 'a[href^="mailto:"]' ).click( function( event ) {

			var link = $( this );
			var href = $( link ).attr( 'href' );

			$.each( attributes, function( key, value ) {

				attributes[key] = null;

			} );

			if( href.indexOf( '?' ) > -1 ) {

				var after = href.split( '?' )[1];

				if( after.indexOf( '&' ) > -1 ) {

					var more_attr = after.split( '&' );

					$.each( more_attr, function( index, attr ) {

						var attr_con = attr.split( '=' );
						attributes[ attr_con[0] ] = attr_con[1];

					});

				} else {

					var one_attr = after.split( '=' );
					attributes[ one_attr[0] ] = one_attr[1];

				}

				attributes['to'] = href.split( 'mailto:' )[1].split( '?' )[0];

			} else {

				attributes['to'] = href.split( 'mailto:' )[1];

			}

			if( $( window ).width() > config.viewport ) {

				if( is( 'closed' ) ) {

					open( attributes, link );

				} else if( is( 'open' ) ) {

					if( !$( this ).hasClass( config.on ) ) {

						$.each( attributes, function( identifier, value ) {

							if( value !== null && value !== $( container ).data( identifier ) ) {

								close( 1, function() {
									open( attributes, link );
								} );

								return false;

							}

						});

					} else {

						close();

					}

				}

				event.preventDefault();

			}

		});

		var form = $( container ).find( 'form' );

		$( form ).submit(function() {

			function is_email( adress ) {

				var reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				return reg.test( adress );

			}

			$.each( config.labels, function( key ) {

				attributes[key] = $( form ).find( '[name="' + key + '"]' ).val();

			});

			$.each( attributes, function( key, value ) {

				var label = $( form ).find( '[for="' + key + '"]' );

				function ok() {
					$( label ).removeClass( 'warning' );
				}

				function not_ok() {
					$( label ).addClass( 'warning' );
				}

				if( !value ) {

					not_ok();

				} else {

					if( key == 'email' ) {

						if( is_email( value ) ) {
							ok();
						} else {
							not_ok();
						}

					} else {
						ok();
					}

				}

			});

			if( $( form ).find( '.warning' ).length == 0 ) {

				attributes['adress'] = $( form ).find( '[name="email"]' ).val();

				$.ajax({

					type: 'POST',
					url: $( form ).attr( 'action' ),
					data: attributes,
					success: function( echo ) {

						if( echo == 1 ) {

							$( form ).fadeOut( 200, function() {

								$( container ).find( '.success' ).fadeIn( 200, function() {

									if( $.isFunction( config.complete ) ) {
										config.complete();
									}

								});

							});

						}

					}

				});

			}

			return false;

		});

	}

}(jQuery));
