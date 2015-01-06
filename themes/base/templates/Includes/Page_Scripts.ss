<% if $isDev %><%-- Site javascript, compiled by browserify --%>
    <script src="{$ThemeDir}/source/js/main.js"></script>
<% else %>
    <script src="/jeremyeatsyourfriends.com$HashPath('/themes/base/production/js/main.js', 0)"></script>
<% end_if %>
