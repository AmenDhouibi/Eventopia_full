import { Injectable } from '@nestjs/common';

@Injectable()
export class MailingService {

    /**
     * ce module permettra à l'event manager d'envoyer des mails (templates)
     * au invités pour les inviter à l'evenement et d'envoyer des mails aux 
     * drivers pour les assigner pour son evenemnt. 
     * Un invité a le choix d'accepter ou de refuser l'invitation, 
     * s'il accepte il doit remplir un formulaire dans notre application, 
     * sinon il peut envoyer un mail (independant de l'application).
     * Quant au driver, s'il accepte l'invitation, il sera associé à l'evenemnt.
     */

}
