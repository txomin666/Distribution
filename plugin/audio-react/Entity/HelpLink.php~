<?php

namespace Innova\AudioReactBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * HelpLink.
 *
 * @ORM\Table(name="innova_audio_react_media_resource_help_link")
 * @ORM\Entity
 */
class HelpLink implements \JsonSerializable
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var text
     *
     * @ORM\Column(type="string", length=510)
     */
    private $url;

    /**
     * @var RegionConfig
     * @ORM\ManyToOne(targetEntity="Innova\AudioReactBundle\Entity\RegionConfig", inversedBy="helpLinks")
     * @ORM\JoinColumn(name="region_config_id", nullable=false)
     */
    private $regionConfig;

    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    public function setUrl($url)
    {
        $this->url = $url;

        return $this;
    }

    public function getUrl()
    {
        return $this->url;
    }

    public function setRegionConfig(RegionConfig $regionConfig)
    {
        $this->regionConfig = $regionConfig;

        return $this;
    }

    public function getRegionConfig()
    {
        return $this->regionConfig;
    }

    public function jsonSerialize()
    {
        return [
            'id' => $this->id,
            'url' => $this->url,
        ];
    }
}
