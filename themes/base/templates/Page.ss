<!doctype html>
<!--[if lt IE 7]> <html class="ie6" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="ie7" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="ie8" lang="en"> <![endif]-->
<!--[if IE 9]>    <html class="ie9" lang="en"> <![endif]-->
<!--[if gt IE 9]><!-->
<html lang="en"> <!--<![endif]-->
<head>
    <% base_tag %>
    $MetaTags( false )
    <title><% if MetaTitle %>$MetaTitle<% else %>$Title | $SiteConfig.Title<% end_if %></title>
    <% include Page_Styles %>

    <script>
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    </script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="favicon.ico"/>
    <% include GoogleAnalytics %>
</head>
<body class="$ClassName">
<main id="site-main">
    <div id="fb-root"></div>
            $Layout
</main>
<!-- /#site-main -->
    <% include Page_Scripts %>
    $BetterNavigator
</body>
</html>
