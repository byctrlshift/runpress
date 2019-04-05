<?php

namespace ComponentBundle\Entity\MailSetting;

/**
 * @author Ihor Drevetskyi <ihor.drevetskyi@gmail.com>
 */
interface MailSettingTranslationExtendedInterface extends MailSettingTranslationInterface
{
    /**
     * @return string|null
     */
    public function getMessageBody(): ?string;

    /**
     * @param string $messageBody
     */
    public function setMessageBody(string $messageBody): void;

    /**
     * @return string|null
     */
    public function getMessageSubject(): ?string;

    /**
     * @param string $messageSubject
     */
    public function setMessageSubject(string $messageSubject): void;
}
