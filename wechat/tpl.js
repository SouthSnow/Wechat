'use strict'

var ejs = require('ejs')
var heredoc = require('heredoc')

var tpl2 = heredoc(function () {/*
	<xml>
	<ToUserName><![CDATA[<%= fromUserName %>]]></ToUserName>
	<FromUserName><![CDATA[<%= toUserName %>]]></FromUserName>
	<CreateTime><![CDATA[<%= createTime %>]]></CreateTime>
	<MsgType><![CDATA[<%= msgType %>]]></MsgType>
	<MediaId><![CDATA[<%= mediaId %>]]></MediaId>
	<MsgId><![CDATA[<%= msgId %>]]></MsgId>
	<% if (msgType === 'text') { %>
		<Content><![CDATA[<%= content %>]]></Content>
	<% } else if (msgType === 'image') { %> 
		<PicUrl><![CDATA[<%= content.picUrl %>]]></PicUrl>
	<% } else if (msgType === 'voice') { %>	
		<Format><![CDATA[<%= content.format %>]]></Format>	
	<% } else if (msgType === 'video') { %>	
		<ThumbMediaId><![CDATA[<%= content.thumbMediaId %>]]></ThumbMediaId>
	<% } else if (msgType === 'shortvideo') { %>	
		<ThumbMediaId><![CDATA[<%= content.thumbMediaId %>]]></ThumbMediaId>
	<% } else if (msgType === 'location') { %>	
		<Location_X><![CDATA[<%= content.location_x %>]]></Location_X>
		<Location_Y><![CDATA[<%= content.location_y %>]]></Location_Y>
		<Scale><![CDATA[<%= content.scale %>]]></Scale>
		<Label><![CDATA[<%= content.label %>]]></Label>
	<% } else if (msgType === 'link') { %>	
		<Title><![CDATA[<%= content.title %>]]></Title>
		<Description><![CDATA[<%= content.description %>]]></Description>
		<Url><![CDATA[<%= content.url %>]]></Url>
	 <% } %> 
	</xml>	
*/})

var tpl = heredoc(function () {/*
     <xml>
     <ToUserName><![CDATA[<%= fromUserName  %>]]></ToUserName>
     <FromUserName><![CDATA[<%= toUserName %>]]></FromUserName>
     <CreateTime><%= createTime %></CreateTime>
    <MsgType><![CDATA[<%= msgType %>]]></MsgType>
	<MediaId><![CDATA[<%= mediaId %>]]></MediaId>
	<MsgId><![CDATA[<%= msgId %>]]></MsgId>
     <% if (msgType === 'text'){ %>
		<Content><![CDATA[<%= content %>]]></Content>
     <% }else if(msgType === 'image'){ %>
     <Image>
        <MediaId><![CDATA[<%= content.mediaId %>]]></MediaId>
     </Image>
     <% }else if(msgType === 'voice'){ %>
     <Voice>
        <MediaId><![CDATA[<%= content.mediaId %>]]></MediaId>
     </Voice>
     <% }else if(msgType === 'video'){ %>
     <Video>
         <MediaId><![CDATA[<%= content.mediaId %>]]></MediaId>
         <Title><![CDATA[<%= content.title %>]]></Title>
         <Description><![CDATA[<%= content.description %>]]></Description>
     </Video>
     <% }else if(msgType === 'music'){ %>
     <Music>
        <Title><![CDATA[<%= content.title %>]]></Title>
        <Description><![CDATA[<%= content.description %>]]></Description>
        <MusicUrl><![CDATA[<%= content.musicUrl %>]]></MusicUrl>
        <HQMusicUrl><![CDATA[<%= content.hqMusicUrl %>]]></HQMusicUrl>
        <ThumbMediaId><![CDATA[<%= content.thumbMediaId %>]]></ThumbMediaId>
     </Music>
     <% }else if(msgType === 'news'){ %>
         <ArticleCount><%= content.length %></ArticleCount>
         <Articles>
         <% content.forEach(function(item){ %>
         <item>
         <Title><![CDATA[<%= item.title %>]]></Title>
         <Description><![CDATA[<%= item.description %>]]></Description>
         <PicUrl><![CDATA[<%= item.picUrl %>]]></PicUrl>
         <Url><![CDATA[<%= item.url %>]]></Url>
         </item>
         <% }) %>
         </Articles>
     <% } %>
     </xml>
*/})


var compiled = ejs.compile(tpl)

exports =  module.exports = {
	compiled: compiled
}




