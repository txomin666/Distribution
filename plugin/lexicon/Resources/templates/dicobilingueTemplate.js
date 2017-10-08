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


export const metaDicobilingue = (name, owner, type, category, fullname, source, cible) =>
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
                <target-language d:lang="'+cible+'"/>\
            </languages>\
            <contents>general vocabulary</contents>\
            <domain>general</domain>\
            <source>'+owner.name+'</source>\
            <authors>'+owner.name+'</authors>\
            <legal>Creative Commons, CC by SA</legal>\
            <access>private</access>\
            <comments/>\
            <administrators>\
                <user-ref name="'+owner.username+'"/>\
            </administrators>\
            <volumes>\
                <volume-metadata-ref source-language="'+source+'" xlink:href="'+name+'_'+source+'-metadata.xml"/>\
                <volume-metadata-ref source-language="'+cible+'" xlink:href="'+name+'_'+cible+'-metadata.xml"/>\
            </volumes>\
            <xsl-stylesheet name="Armement" xlink:href="'+name+'-view.xsl"/>\
        </dictionary-metadata>\
    </dictionary-metadata-files>'


export const volumeDicobilingue = (name, owner, source, cible, fullname, category, type, comment) =>
	'<?xml version="1.0" encoding="UTF-8"?>\
		<d:volume-metadata-files xmlns:d="http://www-clips.imag.fr/geta/services/dml">\
	 		<volume-metadata\
	 			creation-date="'+dateCreate+'"\
	 			dbname="'+name+cible+source+'" encoding="UTF-8" format="xml" hw-number="19"\
	 			installation-date="'+dateCreate+'"\
	 			last-modification-date="'+dateCreate+'"\
	 			location="local" name="'+name+'_'+source+'_'+cible+'" reverse-lookup="false"\
	 			source-language="'+source+'" target-languages="'+cible+'" version="1"\
	 			xmlns="http://www-clips.imag.fr/geta/services/dml" xmlns:d="http://www-clips.imag.fr/geta/services/dml"\
	 			xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
	 			xsi:schemaLocation="http://www-clips.imag.fr/geta/services/dml\
	 			http://www-clips.imag.fr/geta/services/dml/dml.xsd">\
	    		<authors>'+owner.name+'</authors>\
	    		<comments>'+comment+'</comments>\
			    <cdm-elements>\
			        <cdm-volume xpath="/volume"/>\
			        <cdm-entry xpath="/volume/article"/>\
			        <cdm-entry-id xpath="/volume/article/@id"/>\
			        <cdm-headword xpath="/volume/article/forme/vedette/text()"/>\
			        <cdm-pos xpath="/volume/article/forme/classe-gram/text()"/>\
			        <cdm-definition xpath="/volume/article/sémantique/sens/définition/text()"/>\
			        <cdm-sense xpath="/volume/article/sémantique/sens"/>\
			        <cdm-translation d:lang="fra" xpath="/volume/article/sémantique/sens/traduction/texte-traduction/text()"/>\
			        <cdm-example d:lang="esp" xpath="/volume/article/sémantique/sens/exemples/exemple/texte-exemple/text()"/>\
			        <cdm-example d:lang="fra" xpath="/volume/article/sémantique/sens/exemples/exemple/traduction-exemple/text()"/>\
			        <cdm-idiom d:lang="esp" xpath="/volume/article/sémantique/expressions/expression/texte-expression/text()"/>\
			        <cdm-idiom d:lang="fra" xpath="/volume/article/sémantique/expressions/expression/traduction-exemple-expression/text()"/>\
			        <lexinnova-seance index="true" xpath="/volume/article/sémantique/sens/séance/text()"/>\
			        <links/>\
			    </cdm-elements>\
				<administrators><user-ref name="'+owner.username+'"/></administrators>\
				<volume-ref xlink:href="dicobilingue_'+source+'_'+cible+'.xml" source-language="'+source+'"/>\
				<xmlschema-ref xlink:href="'+name+'_'+source+'_'+cible+'.xsd"/>\
				<template-entry-ref xlink:href="'+name+'_'+source+'_'+cible+'-template.xml"/>\
				<xsl-stylesheet default="true" name="'+name+'_'+source+'_'+cible+'" xlink:href="'+name+'_'+source+'_'+cible+'-view.xsl"/>\
			</volume-metadata>\
			<d:template-entry>\
				<volume langue-source="'+source+'" nom="'+name+'_'+source+'_'+cible+'" xmlns:d="http://www-clips.imag.fr/geta/services/dml">\
				<d:contribution d:contribid="" d:originalcontribid="" xmlns:d="http://www-clips.imag.fr/geta/services/dml">\
				<d:metadata><d:author/><d:groups/><d:creation-date/><d:finition-date/><d:review-date/><d:reviewer/><d:validation-date/><d:validator/><d:status/><d:history><d:modification><d:author/><d:date/><d:comment/></d:modification></d:history><d:previous-contribution/><d:previous-classified-finished-contribution/></d:metadata><d:data><article id="">\
				    <forme><vedette/><classe-gram/></forme><sémantique><sens><séance/><définition/>\
				        <traduction lang="'+cible+'"><texte-traduction/><gram-traduction/></traduction>\
				        <exemples><exemple><texte-exemple lang="'+source+'"/><traduction-exemple lang="'+cible+'"/><source/></exemple></exemples>\
				      </sens><expressions><expression><texte-expression lang="'+source+'"/><définition-expression/><exemple-expression lang="'+cible+'"/>\
				          <traduction-exemple-expression lang="'+source+'"/>\
				        </expression></expressions></sémantique><remarques/></article></d:data></d:contribution></volume>\
			</d:template-entry>\
			<d:template-interface><html xmlns="http://www.w3.org/1999/xhtml" xmlns:d="http://www-clips.imag.fr/geta/services/dml">\
				<head><meta content="text/html; charset=utf-8" http-equiv="content-type"/><title>Interface Template</title>\
				</head><body>\
				<form accept-charset="utf-8" action="HandleEntryModifications.po" d:lang="eng" enctype="application/x-www-form-urlencoded" lang="en" method="post" xml:lang="en">\
				<div id="defaultForm" name="EditEntryInterface" type="defaultType">\
				<h1 style="text-align:center">Edition interface</h1>\
				<span class="article"><span class="forme"><span class="vedette"><label for="vedette">vedette:</label><input name="vedette" type="text" value=""/>\
				<br/></span><span class="classe-gram"><label for="classe-gram">classe-gram:</label><input name="classe-gram" type="text" value=""/>\
				<br/></span></span>\
				<span class="sémantique"> <table border="0" cellpadding="5" cellspacing="2" summary="List of senses" width="100%"> <tr style="background-color:#fbbe78"> <td style="text-align:center" width="25"> <input name="sémantique" onclick="this.form.AddCall.value=&apos;sens+" type="submit" value="+"/> <input name="sémantique" onclick="this.form.DelCall.value=&apos;sens+" type="submit" value="-"/> </td> <th align="center">List of senss:</th> </tr> <tr class="sens" style="background-color:#ffebdc"> <td style="text-align:center" valign="top" width="25"> <a name="sens"> </a><input name="select" type="checkbox" value="sens"/> </td> <td class="block" style="text-align:center" valign="top"> <h4 class="blockTitle">sens</h4> <span class="séance"> </span> <span class="définition"> <label for="définition">définition:</label> <input name="définition" type="text" value=""/> <br/> </span> <span class="traduction"> <label for="traduction.@lang">traduction.@lang:</label> <input name="traduction.@lang" type="text" value=""/> <br/> <span class="texte-traduction"> <label for="texte-traduction">texte-traduction:</label> <input name="texte-traduction" type="text" value=""/> <br/> </span> <span class="gram-traduction"> <label for="gram-traduction">gram-traduction:</label> <input name="gram-traduction" type="text" value=""/> <br/> </span> </span> <span class="exemples"> <table border="0" cellpadding="5" cellspacing="2" summary="List of exemples" width="100%"> <tr style="background-color:#fbbe78"> <td style="text-align:center" width="25"> <input name="exemples" onclick="this.form.AddCall.value=&apos;exemple+" type="submit" value="+"/> <input name="exemples" onclick="this.form.DelCall.value=&apos;exemple+" type="submit" value="-"/> </td> <th align="center">List of exemples:</th> </tr> <tr class="exemple" style="background-color:#ffebdc"> <td style="text-align:center" valign="top" width="25"> <a name="exemple"> </a><input name="select" type="checkbox" value="exemple"/> </td> <td class="block" style="text-align:center" valign="top"> <h4 class="blockTitle">exemple</h4> <span class="texte-exemple"> <label for="texte-exemple.@lang">texte-exemple.@lang:</label> <input name="texte-exemple.@lang" type="text" value=""/> <br/> <label for="texte-exemple">texte-exemple:</label> <input name="texte-exemple" type="text" value=""/> <br/> </span> <span class="traduction-exemple"> <label for="traduction-exemple.@lang">traduction-exemple.@lang:</label> <input name="traduction-exemple.@lang" type="text" value=""/> <br/> <label for="traduction-exemple">traduction-exemple:</label> <input name="traduction-exemple" type="text" value=""/> <br/> </span> <span class="source"> </span> </td> </tr> </table> </span> </td> </tr> </table> <span class="expressions"> <span class="expression"> <span class="texte-expression"> <label for="texte-expression.@lang">texte-expression.@lang:</label> <input name="texte-expression.@lang" type="text" value=""/> <br/> <label for="texte-expression">texte-expression:</label> <input name="texte-expression" type="text" value=""/> <br/> </span> <span class="définition-expression"> <label for="définition-expression">définition-expression:</label> <input name="définition-expression" type="text" value=""/> <br/> </span> <span class="exemple-expression"> <label for="exemple-expression.@lang">exemple-expression.@lang:</label> <input name="exemple-expression.@lang" type="text" value=""/> <br/> <label for="exemple-expression">exemple-expression:</label> <input name="exemple-expression" type="text" value=""/> <br/> </span> <span class="traduction-exemple-expression"> <label for="traduction-exemple-expression.@lang">traduction-exemple-expression.@lang:</label> <input name="traduction-exemple-expression.@lang" type="text" value=""/> <br/> <label for="traduction-exemple-expression">traduction-exemple-expression:</label> <input name="traduction-exemple-expression" type="text" value=""/> <br/> </span> </span> </span> </span> <span class="remarques"> </span> </span> </div> </form> </body> </html>\
			</d:template-interface>\
			<xs:schema elementFormDefault="qualified" xmlns:xs="http://www.w3.org/2001/XMLSchema"> <xs:element name="volume"> <xs:complexType> <xs:sequence> <xs:element maxOccurs="unbounded" ref="article"/> </xs:sequence> <xs:attribute name="langue-source" type="xs:NCName" use="required"/> <xs:attribute name="nom" type="xs:NCName" use="required"/> </xs:complexType> </xs:element> <xs:element name="article"> <xs:complexType> <xs:sequence> <xs:element ref="forme"/> <xs:element ref="sémantique"/> <xs:element ref="remarques"/> </xs:sequence> <xs:attribute name="id" type="xs:NCName" use="required"/> </xs:complexType> </xs:element> <xs:element name="forme"> <xs:complexType> <xs:sequence> <xs:element ref="vedette"/> <xs:element ref="classe-gram"/> </xs:sequence> </xs:complexType> </xs:element> <xs:element name="vedette" type="xs:NCName"/> <xs:element name="classe-gram" type="xs:NCName"/> <xs:element name="sémantique"> <xs:complexType> <xs:sequence> <xs:element maxOccurs="unbounded" ref="sens"/> <xs:element ref="expressions"/> </xs:sequence> </xs:complexType> </xs:element> <xs:element name="sens"> <xs:complexType> <xs:sequence> <xs:element ref="séance"/> <xs:element ref="définition"/> <xs:element ref="traduction"/> <xs:element ref="exemples"/> </xs:sequence> </xs:complexType> </xs:element> <xs:element name="séance"> <xs:complexType/> </xs:element> <xs:element name="définition" type="xs:string"/> <xs:element name="traduction"> <xs:complexType> <xs:sequence> <xs:element ref="texte-traduction"/> <xs:element ref="gram-traduction"/> </xs:sequence> <xs:attribute name="lang" type="xs:NCName" use="required"/> </xs:complexType> </xs:element> <xs:element name="texte-traduction" type="xs:string"/> <xs:element name="gram-traduction" type="xs:string"/> <xs:element name="exemples"> <xs:complexType> <xs:sequence> <xs:element maxOccurs="unbounded" minOccurs="0" ref="exemple"/> </xs:sequence> </xs:complexType> </xs:element> <xs:element name="exemple"> <xs:complexType> <xs:sequence> <xs:element ref="texte-exemple"/> <xs:element ref="traduction-exemple"/> <xs:element ref="source"/> </xs:sequence> </xs:complexType> </xs:element> <xs:element name="texte-exemple"> <xs:complexType mixed="true"> <xs:attribute name="lang" type="xs:NCName" use="required"/> </xs:complexType> </xs:element> <xs:element name="traduction-exemple"> <xs:complexType mixed="true"> <xs:attribute name="lang" type="xs:NCName" use="required"/> </xs:complexType> </xs:element> <xs:element name="source"> <xs:complexType/> </xs:element> <xs:element name="expressions"> <xs:complexType> <xs:sequence> <xs:element minOccurs="0" ref="expression"/> </xs:sequence> </xs:complexType> </xs:element> <xs:element name="expression"> <xs:complexType> <xs:sequence> <xs:element ref="texte-expression"/> <xs:element ref="définition-expression"/> <xs:element ref="exemple-expression"/> <xs:element ref="traduction-exemple-expression"/> </xs:sequence> </xs:complexType> </xs:element> <xs:element name="texte-expression"> <xs:complexType mixed="true"> <xs:attribute name="lang" type="xs:NCName" use="required"/> </xs:complexType> </xs:element> <xs:element name="définition-expression" type="xs:string"/> <xs:element name="exemple-expression"> <xs:complexType mixed="true"> <xs:attribute name="lang" type="xs:NCName" use="required"/> </xs:complexType> </xs:element> <xs:element name="traduction-exemple-expression"> <xs:complexType mixed="true"> <xs:attribute name="lang" type="xs:NCName" use="required"/> </xs:complexType> </xs:element> <xs:element name="remarques"> <xs:complexType/> </xs:element> </xs:schema>\
			<xsl:stylesheet exclude-result-prefixes="xsl" extension-element-prefixes="jbk" version="1.0" xmlns="http://www.w3.org/1999/xhtml" xmlns:d="http://www-clips.imag.fr/geta/services/dml" xmlns:jbk="xalan://fr.imag.clips.papillon.business.xsl.JibikiXsltExtension" xmlns:xml="http://www.w3.org/XML/1998/namespace" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"> <xsl:output encoding="utf-8" indent="no" method="xml"/> <xsl:template match="/"> <xsl:apply-templates select="//article"> <xsl:with-param name="cid" select="//d:contribution/@d:contribid"/> <xsl:with-param name="volume" select="/volume/@nom"/> <xsl:with-param name="src" select="/volume/@langue-source"/> </xsl:apply-templates> </xsl:template> <xsl:template match="article"> <xsl:param name="cid" select="@id"/> <xsl:param name="volume" select="&apos;'+name+'_'+source+'_'+cible+'&apos;"/> <xsl:param name="src" select="&apos;esp&apos;"/> <div class="contribution"> <xsl:attribute name="id"> <xsl:value-of select="$cid"/> </xsl:attribute> <div> <xsl:attribute name="class">entry</xsl:attribute> <div class="import"> <a> <xsl:attribute name="href">importArticle.php?CONTRIBUTIONID=<xsl:value-of select="string($cid)"/>&amp;VOLUME=<xsl:value-of select="string($volume)"/>&amp;SOURCE=<xsl:value-of select="string($src)"/></xsl:attribute>+ </a> </div> <div class="entrybody"> <xsl:apply-templates/> </div> </div> <script type="text/javascript"><xsl:comment>loadEditable();</xsl:comment></script> </div> </xsl:template> <xsl:template match="vedette"> <span class="headword"> <xsl:apply-templates/> </span> </xsl:template> <xsl:template match="classe-gram"> <xsl:text/>[ <span class="pos"> <xsl:apply-templates/> </span>] </xsl:template> <xsl:template match="traduction"> <xsl:if test="texte-traduction/text()!=&apos;&apos;"> <span> <xsl:attribute name="class"> <xsl:value-of select="@lang"/> </xsl:attribute> <xsl:apply-templates/> </span> </xsl:if> </xsl:template> <xsl:template match="exemples"> <xsl:if test="exemple/texte-exemple/text()!=&apos;&apos;"> <ul class="exemples"> <xsl:apply-templates/> </ul> </xsl:if> </xsl:template> <xsl:template match="exemple"> <xsl:if test="texte-exemple/text()!=&apos;&apos;"> <li> <xsl:apply-templates/> </li> </xsl:if> </xsl:template> <xsl:template match="texte-exemple"> <xsl:if test="text()!=&apos;&apos;"> <em> <span class="esp"> <span class="editable"> <xsl:attribute name="xpath"><xsl:for-each select="ancestor-or-self::*"><xsl:value-of select="concat(&apos;/&apos;,name())"/><xsl:if test="(preceding-sibling::*|following-sibling::*)[name()=name(current())]"><xsl:value-of select="concat(&apos;[&apos;,count(preceding-sibling::*[name()=name(current())])+1,&apos;]&apos;)"/></xsl:if></xsl:for-each></xsl:attribute> <xsl:apply-templates/> </span> </span> </em> <br/> </xsl:if> </xsl:template> <xsl:template match="traduction-exemple"> <xsl:if test="text()!=&apos;&apos;"> <em> <span> <xsl:attribute name="class"> <xsl:value-of select="@lang"/> </xsl:attribute> <span class="editable"> <xsl:attribute name="xpath"><xsl:for-each select="ancestor-or-self::*"><xsl:value-of select="concat(&apos;/&apos;,name())"/><xsl:if test="(preceding-sibling::*|following-sibling::*)[name()=name(current())]"><xsl:value-of select="concat(&apos;[&apos;,count(preceding-sibling::*[name()=name(current())])+1,&apos;]&apos;)"/></xsl:if></xsl:for-each></xsl:attribute> <xsl:apply-templates/> </span> </span> </em> </xsl:if> </xsl:template> <xsl:template match="source"> <xsl:if test="text()!=&apos;&apos;"> [<xsl:apply-templates/>]</xsl:if> </xsl:template> <xsl:template match="sens"> <blockquote style="border-left:0px;"> <xsl:apply-templates/> </blockquote> </xsl:template> <xsl:template match="texte-expression"> <xsl:if test="text()!=&apos;&apos;"> <span class="esp"> <span class="texte-expression editable"> <xsl:attribute name="xpath"><xsl:for-each select="ancestor-or-self::*"><xsl:value-of select="concat(&apos;/&apos;,name())"/><xsl:if test="(preceding-sibling::*|following-sibling::*)[name()=name(current())]"><xsl:value-of select="concat(&apos;[&apos;,count(preceding-sibling::*[name()=name(current())])+1,&apos;]&apos;)"/></xsl:if></xsl:for-each></xsl:attribute> <xsl:apply-templates/> </span> </span> </xsl:if> </xsl:template> <xsl:template match="exemple-expression"> <xsl:if test="text()!=&apos;&apos;"> <em> <span class="esp"> <span class="exemple-expression editable"> <xsl:attribute name="xpath"><xsl:for-each select="ancestor-or-self::*"><xsl:value-of select="concat(&apos;/&apos;,name())"/><xsl:if test="(preceding-sibling::*|following-sibling::*)[name()=name(current())]"><xsl:value-of select="concat(&apos;[&apos;,count(preceding-sibling::*[name()=name(current())])+1,&apos;]&apos;)"/></xsl:if></xsl:for-each></xsl:attribute> <xsl:apply-templates/> </span> </span> </em> </xsl:if> </xsl:template> <xsl:template match="traduction-exemple-expression"> <xsl:if test="text()!=&apos;&apos;"> <em> <span> <xsl:attribute name="class"> <xsl:value-of select="@lang"/> </xsl:attribute> <span class="traduction-exemple-expression editable"> <xsl:attribute name="xpath"> <xsl:for-each select="ancestor-or-self::*"> <xsl:value-of select="concat(&apos;/&apos;,name())"/> <xsl:if test="(preceding-sibling::*|following-sibling::*)[name()=name(current())]"> <xsl:value-of select="concat(&apos;[&apos;,count(preceding-sibling::*[name()=name(current())])+1,&apos;]&apos;)"/> </xsl:if> </xsl:for-each> </xsl:attribute> <xsl:apply-templates/> </span> </span> </em> </xsl:if> </xsl:template> <xsl:template match="remarques"> <div style="font-family:courier"><xsl:apply-templates/></div> </xsl:template> <xsl:template name="statusclass"> <xsl:param name="author">unknown</xsl:param> <xsl:param name="login">guest</xsl:param> <xsl:param name="status">unknown</xsl:param> <xsl:choose> <xsl:when test="$author=$login"> <xsl:choose> <xsl:when test="$status=&apos;finished&apos;">myFinishedEntry</xsl:when> <xsl:when test="$status=&apos;modified&apos;">modifiedEntry</xsl:when> <xsl:when test="$status=&apos;deleted&apos;">modifiedEntry</xsl:when> <xsl:when test="$status=&apos;not finished&apos;">myNotFinishedEntry</xsl:when> </xsl:choose> </xsl:when> <xsl:otherwise> <xsl:choose> <xsl:when test="$status=&apos;finished&apos;">finishedEntry</xsl:when> <xsl:when test="$status=&apos;modified&apos;">modifiedEntry</xsl:when> <xsl:when test="$status=&apos;deleted&apos;">modifiedEntry</xsl:when> <xsl:when test="$status=&apos;not finished&apos;">notFinishedEntry</xsl:when> </xsl:choose> </xsl:otherwise> </xsl:choose> </xsl:template> </xsl:stylesheet>\
		</d:volume-metadata-files>'


export const articleDicobilingue = (lemme, cat, def, trad, tradcat, expl, source, cible, id, name) =>
 	'<?xml version="1.0" encoding="UTF-8"?>\
		<volume xmlns:d="http://www-clips.imag.fr/geta/services/dml"\
  				xmlns:xml="http://www.w3.org/XML/1998/namespace"    langue-source="'+source+'"    nom="'+name+'_'+source+'_'+cible+'">\
	 		<article id="'+id+'">\
				<forme>\
					<vedette>'+lemme+'</vedette>\
					<classe-gram>'+cat+'</classe-gram>\
				</forme>\
				<sémantique>\
					<sens>\
						<séance/>\
						<définition>'+def+'</définition>\
						<traduction lang="'+cible+'">\
							<texte-traduction>'+trad+'</texte-traduction>\
							<gram-traduction>'+tradcat+'</gram-traduction>\
						</traduction>\
						<exemples>\
							<exemple>\
								<texte-exemple lang="'+source+'">'+expl+'</texte-exemple>\
								<traduction-exemple lang="'+cible+'"/>\
								<source/>\
							</exemple>\
						</exemples>\
					</sens>\
					<expressions></expressions>\
				</sémantique>\
				<remarques/>\
			</article>\
		</volume>'


