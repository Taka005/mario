import { EntityManager } from "./EntityManager";
import { EntityOption } from "./Entity";
import { parseImage, resize, ObjectType } from "../utils";

/**
 * @typedef {Object} CircleOption
 * @property {strint} name 物体名
 * @property {number} posX X座標
 * @property {number} posY Y座標
 * @property {number} size 半径
 * @property {number} mass 質量
 * @property {number} stiff 剛性(これは0以上1以下です)
 * @property {number} speedX X方向の速度
 * @property {number} speedY Y方向の速度
 * @property {string} color 色
 * @property {string} subColor サブカラー
 * @property {string | null} image 画像
 * @property {EntityOption[]} entities 構成されているエンティティーの初期化オプション
 * @property {string} script カスタムスクリプト
 */
type CircleOption = {
  name: string;
  posX: number;
  posY: number;
  size: number;
  mass: number;
  stiff: number;
  speedX?: number;
  speedY?: number;
  color?: string;
  subColor?: string;
  image?: string | null;
  entities: EntityOption[];
  script?: string;
}

/**
 * サークルクラス
 * 円を制御します
 *
 * @extends EntityManager
 */
class Circle extends EntityManager{

  /**
   * 種類
   */
  public readonly type: string = ObjectType.Circle;

  /**
   * 名前
   */
  public readonly name: string;

  /**
   * 半径
   */
  public size: number;

  /**
   * 質量
   */
  public mass: number;

  /**
   * 剛性
   */
  public stiff: number;

  /**
   * 色
   */
  public color: string;

  /**
   * 補色
   */
  public subColor: string;

  /**
   * 画像
   */
  public image: HTMLImageElement | null;

  /**
   * カスタムスクリプト
   */
  public script: string;

  /**
   * @param {CircleOption} サークルオプション
   */
  constructor({ name, posX, posY, size, mass, stiff, speedX = 0, speedY = 0, color = "red", subColor = "black", image = null, entities = [], script = "" }: CircleOption){
    super();

    this.name = name;
    this.size = size;
    this.mass = mass;
    this.stiff = stiff;
    this.color = color;
    this.subColor = subColor;
    this.image = parseImage(image);
    this.script = script;

    if(entities[0]){
      entities.forEach(entity=>this.create(entity));
    }else{
      this.create({
        posX: posX,
        posY: posY,
        size: this.size,
        mass: this.mass,
        stiff: this.stiff,
        speedX: speedX,
        speedY: speedY,
        parent: this.name
      });
    }
  }

  /**
   * オブジェクトを描画します
   * @param {CanvasRenderingContext2D} ctx コンテキスト
   */
  public draw(ctx: CanvasRenderingContext2D): void{
    const { posX, posY } = this.getPosition();
    const rotate = this.getRotate();

    ctx.save();
    ctx.translate(posX,posY);
    ctx.rotate(rotate*(Math.PI/180));

    if(this.image){
      const { width, height } = resize(this.image,this.size*2);

      ctx.drawImage(
        this.image,
        -width/2,
        -height/2,
        width,
        height
      );
    }else{
      ctx.beginPath();
      ctx.arc(0,0,this.size,0,2*Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.lineTo(0,-this.size);
      ctx.strokeStyle = this.subColor;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    ctx.restore();
  }

  /**
   * 速度ベクトルを描画します
   * @param {CanvasRenderingContext2D} ctx コンテキスト
   */
  public drawVector(ctx: CanvasRenderingContext2D): void{
    const { posX, posY } = this.getPosition();
    const { speedX, speedY } = this.getSpeed();

    ctx.beginPath();
    ctx.moveTo(posX,posY);
    ctx.lineTo(posX + speedX,posY + speedY);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  /**
   * 物体を複製します
   * @returns {Circle} 複製された物体
   */
  public clone(): Circle{
    return new Circle(this.toJSON());
  }

  /**
   * クラスのデータをJSONに変換します
   * @returns {CircleOption} サークルオプション
   */
  public toJSON(): CircleOption{
    const { posX, posY } = this.getPosition();
    const { speedX, speedY } = this.getSpeed();

    return {
      name: this.name,
      posX: posX,
      posY: posY,
      size: this.size,
      mass: this.mass,
      stiff: this.stiff,
      speedX: speedX,
      speedY: speedY,
      color: this.color,
      subColor: this.subColor,
      image: this.image?.src || null,
      entities: this.entities.map(entity=>entity.toJSON()),
      script: this.script
    }
  }
}

export { Circle, CircleOption };