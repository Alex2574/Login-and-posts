import { browser, by, element } from 'protractor';
import { Button } from './elements/button.element';

export class PostPage {

  postButton: Button<PostPage>  = new Button<PostPage>(by.id('post-id-M3FmQy1BjEM9069EZv_'), PostPage);
}
