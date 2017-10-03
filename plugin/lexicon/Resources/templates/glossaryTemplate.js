import React from 'react'


let date       = new Date()
date           = date.toLocaleString("fra")
const dateInst = date.replace('à', '')
const datepart = dateInst.split(' ')
let year       = datepart[0].replace('/', '-')
year           = year.replace('/', '-').split('-')
year           = year[2]+'-'+year[1]+'-'+year[0]
let dateCreate = year+'T'+datepart[2]+'+02:00'
dateCreate     = dateCreate

console.log(year)

export const metaGlossaire = (name, owner, type, category, fullname, source) =>
   '<?xml version="1.0" encoding="UTF-8"?>\
    <dictionary-metadata-files xmlns:d="http://www-clips.imag.fr/geta/services/dml">\
        <dictionary-metadata\
            xmlns="http://www-clips.imag.fr/geta/services/dml"\
            xmlns:d="http://www-clips.imag.fr/geta/services/dml"\
            xmlns:xlink="http://www.w3.org/1999/xlink"\
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
            category="'+category+'"\
            creation-date="'+dateCreate+'"\
            fullname="'+fullname+'"\
            installation-date="'+dateInst+'"\
            last-modification-date="'+dateCreate+'" \
            name="'+name+'"\
            owner="'+owner.username+'"\
            type="'+type+'"\
            xsi:schemaLocation="http://www-clips.imag.fr/geta/services/dml http://www-clips.imag.fr/geta/services/dml/dml.xsd">\
            <languages>\
				<source-language d:lang="'+source+'"/>\
			</languages>\
			<contents>vocabulaire général</contents>\
			<domain>général</domain>\
			<source>GETALP</source>\
			<authors>'+owner.name+'</authors>\
			<legal>Creative Commons, CC by SA</legal>\
			<access>public</access>\
			<comments>'+fullname+'</comments>\
			<administrators>\
			     <user-ref name="'+owner.username+'"/>\
			</administrators>\
			<volumes>\
			  <volume-metadata-ref name="'+name+'_'+source+'" xlink:href="'+name+'_'+source+'-metadata.xml" source-language="'+source+'" target-languages="" />\
			</volumes>\
        </dictionary-metadata>\
    </dictionary-metadata-files>'


const dbname = ''

export const volumeGlossaire = (name, owner, source, fullname, category, type, comment) =>
   '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\
		<d:volume-metadata-files xmlns:d="http://www-clips.imag.fr/geta/services/dml">\
		   <volume-metadata\
		   	creation-date="'+dateCreate+'"\
 			dbname="'+name+source+'" encoding="UTF-8" format="xml" hw-number="19"\
 			installation-date="'+dateCreate+'"\
 			last-modification-date="'+dateCreate+'"\
 			location="local" name="'+name+'_'+source+'" reverse-lookup="false"\
 			source-language="'+source+'" target-languages="" version="1"\
 			xmlns="http://www-clips.imag.fr/geta/services/dml" xmlns:d="http://www-clips.imag.fr/geta/services/dml"\
 			xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
 			xsi:schemaLocation="http://www-clips.imag.fr/geta/services/dml\
 			http://www-clips.imag.fr/geta/services/dml/dml.xsd">\
	    		<authors>'+owner.name+'</authors>\
	    		<comments>'+comment+'</comments>\
				<cdm-elements>\
				  	<cdm-volume xpath="/glossaire"/>\
					<cdm-entry xpath="/glossaire/entrée"/>\
					<cdm-entry-id xpath="/glossaire/entrée/@id"/>\
					<cdm-headword xpath="/glossaire/entrée/terme/text()"/>\
					<cdm-definition xpath="/glossaire/entrée/définition/text()"/>\
					<links></links>\
				</cdm-elements>\
				<administrators>\
					<user-ref name="'+owner.username+'"/>\
				</administrators>\
				<volume-ref xlink:href="'+name+'_'+source+'.xml" source-language="'+source+'"/>\
				<xmlschema-ref xlink:href="'+name+'_'+source+'.xsd"/>\
				<template-entry-ref xlink:href="'+name+'_'+source+'-template.xml"/>\
			</volume-metadata>\
			<d:template-entry>\
				<volume langue-source="'+source+'" nom="'+name+'_'+source+'" xmlns:d="http://www-clips.imag.fr/geta/services/dml">\
				<d:contribution d:contribid="" d:originalcontribid="" xmlns:d="http://www-clips.imag.fr/geta/services/dml">\
				<d:metadata><d:author/><d:groups/><d:creation-date/><d:finition-date/><d:review-date/><d:reviewer/><d:validation-date/><d:validator/><d:status/><d:history><d:modification><d:author/><d:date/><d:comment/></d:modification></d:history><d:previous-contribution/><d:previous-classified-finished-contribution/></d:metadata><d:data>\
				   <glossaire src="'+source+'"><entrée id=""><terme/><définition/></entrée></glossaire></d:data></d:contribution></volume>\
			</d:template-entry>\
			<d:template-interface><html xmlns="http://www.w3.org/1999/xhtml" xmlns:d="http://www-clips.imag.fr/geta/services/dml">\
				<head><meta content="text/html; charset=utf-8" http-equiv="content-type"/><title>Interface Template</title>\
				</head><body>\
				<form accept-charset="utf-8" action="HandleEntryModifications.po" d:lang="'+source+'" enctype="application/x-www-form-urlencoded" lang="en" method="post" xml:lang="en">\
				<div id="defaultForm" name="EditEntryInterface" type="defaultType">\
				<h1 style="text-align:center">Edition interface</h1>\
				<span class="glossaire"><span class="entrée"><span class="terme"><label for="terme">terme:</label><input name="terme" type="text" value=""/>\
				<br/></span><span class="définition"><label for="définition">définition:</label><input name="définition" type="text" value=""/>\
				<br/></span></span></span></div> </form> </body> </html>\
			</d:template-interface>\
			<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified">\
  				<xs:element name="glossaire"><xs:complexType><xs:sequence><xs:element maxOccurs="unbounded" ref="entrée"/>\
      			</xs:sequence><xs:attribute name="src" use="required" type="xs:NCName"/></xs:complexType></xs:element>\
  				<xs:element name="entrée"><xs:complexType><xs:sequence><xs:element ref="terme"/><xs:element ref="définition"/>\
      			</xs:sequence></xs:complexType></xs:element><xs:element name="terme" type="xs:string"/><xs:element name="définition" type="xs:string"/>\
			</xs:schema>\
			<xsl:stylesheet exclude-result-prefixes="xsl" extension-element-prefixes="jbk" version="1.0" xmlns="http://www.w3.org/1999/xhtml" xmlns:d="http://www-clips.imag.fr/geta/services/dml" xmlns:jbk="xalan://fr.imag.clips.papillon.business.xsl.JibikiXsltExtension" xmlns:xml="http://www.w3.org/XML/1998/namespace" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"> <xsl:output encoding="utf-8" indent="no" method="xml"/> <xsl:template match="/"> <xsl:apply-templates select="//article"> <xsl:with-param name="cid" select="//d:contribution/@d:contribid"/> <xsl:with-param name="volume" select="/volume/@nom"/> <xsl:with-param name="src" select="/volume/@langue-source"/> </xsl:apply-templates> </xsl:template> <xsl:template match="article"> <xsl:param name="cid" select="@id"/> <xsl:param name="volume" select="&apos;'+name+'_'+source+'_'+'&apos;"/> <xsl:param name="src" select="&apos;esp&apos;"/> <div class="contribution"> <xsl:attribute name="id"> <xsl:value-of select="$cid"/> </xsl:attribute> <div> <xsl:attribute name="class">entry</xsl:attribute> <div class="import"> <a> <xsl:attribute name="href">importArticle.php?CONTRIBUTIONID=<xsl:value-of select="string($cid)"/>&amp;VOLUME=<xsl:value-of select="string($volume)"/>&amp;SOURCE=<xsl:value-of select="string($src)"/></xsl:attribute>+ </a> </div> <div class="entrybody"> <xsl:apply-templates/> </div> </div> <script type="text/javascript"><xsl:comment>loadEditable();</xsl:comment></script> </div> </xsl:template> <xsl:template match="vedette"> <span class="headword"> <xsl:apply-templates/> </span> </xsl:template> <xsl:template match="classe-gram"> <xsl:text/>[ <span class="pos"> <xsl:apply-templates/> </span>] </xsl:template> <xsl:template match="traduction"> <xsl:if test="texte-traduction/text()!=&apos;&apos;"> <span> <xsl:attribute name="class"> <xsl:value-of select="@lang"/> </xsl:attribute> <xsl:apply-templates/> </span> </xsl:if> </xsl:template> <xsl:template match="exemples"> <xsl:if test="exemple/texte-exemple/text()!=&apos;&apos;"> <ul class="exemples"> <xsl:apply-templates/> </ul> </xsl:if> </xsl:template> <xsl:template match="exemple"> <xsl:if test="texte-exemple/text()!=&apos;&apos;"> <li> <xsl:apply-templates/> </li> </xsl:if> </xsl:template> <xsl:template match="texte-exemple"> <xsl:if test="text()!=&apos;&apos;"> <em> <span class="esp"> <span class="editable"> <xsl:attribute name="xpath"><xsl:for-each select="ancestor-or-self::*"><xsl:value-of select="concat(&apos;/&apos;,name())"/><xsl:if test="(preceding-sibling::*|following-sibling::*)[name()=name(current())]"><xsl:value-of select="concat(&apos;[&apos;,count(preceding-sibling::*[name()=name(current())])+1,&apos;]&apos;)"/></xsl:if></xsl:for-each></xsl:attribute> <xsl:apply-templates/> </span> </span> </em> <br/> </xsl:if> </xsl:template> <xsl:template match="traduction-exemple"> <xsl:if test="text()!=&apos;&apos;"> <em> <span> <xsl:attribute name="class"> <xsl:value-of select="@lang"/> </xsl:attribute> <span class="editable"> <xsl:attribute name="xpath"><xsl:for-each select="ancestor-or-self::*"><xsl:value-of select="concat(&apos;/&apos;,name())"/><xsl:if test="(preceding-sibling::*|following-sibling::*)[name()=name(current())]"><xsl:value-of select="concat(&apos;[&apos;,count(preceding-sibling::*[name()=name(current())])+1,&apos;]&apos;)"/></xsl:if></xsl:for-each></xsl:attribute> <xsl:apply-templates/> </span> </span> </em> </xsl:if> </xsl:template> <xsl:template match="source"> <xsl:if test="text()!=&apos;&apos;"> [<xsl:apply-templates/>]</xsl:if> </xsl:template> <xsl:template match="sens"> <blockquote style="border-left:0px;"> <xsl:apply-templates/> </blockquote> </xsl:template> <xsl:template match="texte-expression"> <xsl:if test="text()!=&apos;&apos;"> <span class="esp"> <span class="texte-expression editable"> <xsl:attribute name="xpath"><xsl:for-each select="ancestor-or-self::*"><xsl:value-of select="concat(&apos;/&apos;,name())"/><xsl:if test="(preceding-sibling::*|following-sibling::*)[name()=name(current())]"><xsl:value-of select="concat(&apos;[&apos;,count(preceding-sibling::*[name()=name(current())])+1,&apos;]&apos;)"/></xsl:if></xsl:for-each></xsl:attribute> <xsl:apply-templates/> </span> </span> </xsl:if> </xsl:template> <xsl:template match="exemple-expression"> <xsl:if test="text()!=&apos;&apos;"> <em> <span class="esp"> <span class="exemple-expression editable"> <xsl:attribute name="xpath"><xsl:for-each select="ancestor-or-self::*"><xsl:value-of select="concat(&apos;/&apos;,name())"/><xsl:if test="(preceding-sibling::*|following-sibling::*)[name()=name(current())]"><xsl:value-of select="concat(&apos;[&apos;,count(preceding-sibling::*[name()=name(current())])+1,&apos;]&apos;)"/></xsl:if></xsl:for-each></xsl:attribute> <xsl:apply-templates/> </span> </span> </em> </xsl:if> </xsl:template> <xsl:template match="traduction-exemple-expression"> <xsl:if test="text()!=&apos;&apos;"> <em> <span> <xsl:attribute name="class"> <xsl:value-of select="@lang"/> </xsl:attribute> <span class="traduction-exemple-expression editable"> <xsl:attribute name="xpath"> <xsl:for-each select="ancestor-or-self::*"> <xsl:value-of select="concat(&apos;/&apos;,name())"/> <xsl:if test="(preceding-sibling::*|following-sibling::*)[name()=name(current())]"> <xsl:value-of select="concat(&apos;[&apos;,count(preceding-sibling::*[name()=name(current())])+1,&apos;]&apos;)"/> </xsl:if> </xsl:for-each> </xsl:attribute> <xsl:apply-templates/> </span> </span> </em> </xsl:if> </xsl:template> <xsl:template match="remarques"> <div style="font-family:courier"><xsl:apply-templates/></div> </xsl:template> <xsl:template name="statusclass"> <xsl:param name="author">unknown</xsl:param> <xsl:param name="login">guest</xsl:param> <xsl:param name="status">unknown</xsl:param> <xsl:choose> <xsl:when test="$author=$login"> <xsl:choose> <xsl:when test="$status=&apos;finished&apos;">myFinishedEntry</xsl:when> <xsl:when test="$status=&apos;modified&apos;">modifiedEntry</xsl:when> <xsl:when test="$status=&apos;deleted&apos;">modifiedEntry</xsl:when> <xsl:when test="$status=&apos;not finished&apos;">myNotFinishedEntry</xsl:when> </xsl:choose> </xsl:when> <xsl:otherwise> <xsl:choose> <xsl:when test="$status=&apos;finished&apos;">finishedEntry</xsl:when> <xsl:when test="$status=&apos;modified&apos;">modifiedEntry</xsl:when> <xsl:when test="$status=&apos;deleted&apos;">modifiedEntry</xsl:when> <xsl:when test="$status=&apos;not finished&apos;">notFinishedEntry</xsl:when> </xsl:choose> </xsl:otherwise> </xsl:choose> </xsl:template> </xsl:stylesheet>\
		</d:volume-metadata-files>'


export const articleGlossaire = (lemme, def, source) =>
	'<glossaire src="'+source+'">\
		<entrée>\
			<terme>'+lemme+'</terme>\
			<définition>'+def+'</définition>\
		</entrée>\
	</glossaire>'


