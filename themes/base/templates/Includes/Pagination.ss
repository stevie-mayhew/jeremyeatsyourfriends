<% if $DataList.MoreThanOnePage %>
    <div id="PageNumbers" class="pagination">
        <% if $DataList.NotFirstPage %>
            <a class="prev pagination-block" href="$DataList.PrevLink" title="View the previous page"><i class="fa fa-chevron-left"></i><span>Prev</span></a>
        <% end_if %>
        <% loop $DataList.Pages(7) %>
            <% if $CurrentBool %>
                <span class="pagination-block">$PageNum</span>
            <% else %>
                <% if $Link %>
                    <a href="$Link" class="pagination-block" title="View page number $PageNum">$PageNum</a>
                <% end_if %>
            <% end_if %>
        <% end_loop %>
        <% if $DataList.NotLastPage %>
            <a class="next pagination-block" href="$DataList.NextLink" title="View the next page"><i class="fa fa-chevron-right"></i><span>Next</span></a>
        <% end_if %>
    </div>
<% end_if %>