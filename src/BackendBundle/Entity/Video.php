<?php

namespace BackendBundle\Entity;

use ComponentBundle\Entity\__Call\__CallInterface;
use ComponentBundle\Entity\__Call\__CallTrait;
use ComponentBundle\Entity\Id\IdInterface;
use ComponentBundle\Entity\Id\IdTrait;
use ComponentBundle\Entity\Position\PositionInterface;
use ComponentBundle\Entity\Position\PositionTrait;
use ComponentBundle\Entity\Poster\PosterTrait;
use ComponentBundle\Entity\ShowOnWebsite\ShowOnWebsiteInterface;
use ComponentBundle\Entity\ShowOnWebsite\ShowOnWebsiteTrait;
use ComponentBundle\Entity\YesOrNo\YesOrNoInterface;
use ComponentBundle\Entity\YesOrNo\YesOrNoTrait;
use SeoBundle\Entity\SeoTrait;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Knp\DoctrineBehaviors\Model as ORMBehaviors;

/**
 * Video
 *
 * @Gedmo\Loggable
 * @ORM\HasLifecycleCallbacks()
 * @ORM\Table(name="video_table", uniqueConstraints={
@ORM\UniqueConstraint(name="seo_UNIQUE", columns={"seo_id"})
 *     }, indexes={
@ORM\Index(name="seo_idx", columns={"seo_id"}),
@ORM\Index(name="position_idx", columns={"position"}),
@ORM\Index(name="show_on_website_idx", columns={"show_on_website"}),
 *     })
 * @ORM\Entity(repositoryClass="BackendBundle\Entity\Repository\VideoRepository")
 * @author Design studio origami <https://origami.ua>
 */
class Video implements YesOrNoInterface, IdInterface, __CallInterface, PositionInterface, ShowOnWebsiteInterface
{
    use ORMBehaviors\Timestampable\Timestampable,
        ORMBehaviors\Translatable\Translatable;

    use SeoTrait;
    use __CallTrait;
    use IdTrait;
    use YesOrNoTrait;
    use PositionTrait;
    use ShowOnWebsiteTrait;

    /**
     * @var \DateTimeInterface|null
     *
     * @ORM\Column(name="publish_at", type="datetime", nullable=false)
     * @Gedmo\Versioned
     */
    protected $publishAt;

    /**
     * @var string
     *
     * @Gedmo\Versioned
     * @ORM\Column(name="iframe", type="text", nullable=true)
     */
    private $iframe;

    public function __toString(): string
    {
        return (string)$this->translate()->getTitle();
    }

    /**
     * @return string
     */
    public function getIframe(): ?string
    {
        return $this->iframe;
    }

    /**
     * @param string $iframe
     */
    public function setIframe(?string $iframe): void
    {
        $this->iframe = $iframe;
    }

    /**
     * @return mixed|string
     */
    public function getPublishAt(): \DateTimeInterface
    {
        if (!$this->publishAt) {
            self::setPublishAt(null);
        }

        return $this->publishAt;
    }

    public function setPublishAt($publishAt): void
    {
        if (is_null($publishAt)) {
            $this->publishAt = new \DateTime();
        } else {
            $this->publishAt = $publishAt;
        }
    }

    public function getCode()
    {
        preg_match('/\/([^\/]+)$/', $this->getIframe(), $matches);
        
        return !empty($matches[1]) ? $matches[1] : '';
    }
}
