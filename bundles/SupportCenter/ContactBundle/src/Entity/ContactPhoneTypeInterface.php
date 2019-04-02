<?php

namespace IhorDrevetskyi\SupportCenter\ContactBundle\Entity;

use IhorDrevetskyi\ComponentBundle\Entity\__Call\__CallInterface;
use Doctrine\Common\Collections\Collection;
use IhorDrevetskyi\ComponentBundle\Entity\Id\IdInterface;
use IhorDrevetskyi\ComponentBundle\Entity\Position\PositionInterface;
use IhorDrevetskyi\ComponentBundle\Entity\ShowOnWebsite\ShowOnWebsiteInterface;
use IhorDrevetskyi\ComponentBundle\Entity\YesOrNo\YesOrNoInterface;

/**
 * @author Ihor Drevetskyi <ihor.drevetskyi@gmail.com>
 */
interface ContactPhoneTypeInterface extends
    YesOrNoInterface,
    IdInterface,
    __CallInterface,
    PositionInterface,
    ShowOnWebsiteInterface
{
    /**
     * ContactPhoneTypeInterface constructor.
     */
    public function __construct();

    /**
     * @return Collection
     */
    public function getContactPhones(): Collection;

    /**
     * @return bool
     */
    public function hasContactPhones(): bool;

    /**
     * @param ContactPhoneInterface $contactPhone
     * @return bool
     */
    public function hasContactPhone(ContactPhoneInterface $contactPhone): bool;

    /**
     * @param ContactPhoneInterface $contactPhone
     */
    public function removeContactPhone(ContactPhoneInterface $contactPhone): void;

    /**
     * @param ContactPhoneInterface $contactPhone
     */
    public function addContactPhone(ContactPhoneInterface $contactPhone): void;
}
