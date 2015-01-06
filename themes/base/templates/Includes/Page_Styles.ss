<% if $isDev %><%-- Site stylesheet, compiled by recess --%>
    <link rel="stylesheet" href="{$ThemeDir}/source/css/style.css">
<% else %>
    <link rel="stylesheet" href="/jeremyeatsyourfriends.com$HashPath('/themes/base/production/css/style.css', 0)">
<% end_if %>
