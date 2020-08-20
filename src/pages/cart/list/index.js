import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { CheckboxItem, InputNumber } from '@components'
import './index.scss'

export default class List extends Component {
  // 📒 defaultProps：为 props 指定默认值，避免 props 尚未赋值时为 null
  static defaultProps = {
    list: [],
    onUpdate: () => {},
    onUpdateCheck: () => {}
  }

  getBaseItem = (item) => ({
    skuId: item.skuId,
    type: item.type,
    extId: item.extId,
    cnt: item.cnt,
    checked: item.checked,
    canCheck: true,
    promId: this.props.promId,
    promType: this.props.promType
  })

  handleUpdate = (item, cnt) => {
    const payload = {
      skuList: [{ ...this.getBaseItem(item), cnt }]
    }
    this.props.onUpdate(payload)
  }

  handleUpdateCheck = (item) => {
    const payload = {
      skuList: [{ ...this.getBaseItem(item), checked: !item.checked }]
    }
    this.props.onUpdateCheck(payload)
  }

  handleRemove = () => {
    // XXX 暂未实现左滑删除
  }

  render () {
    const { list } = this.props
    return (
      <View className='cart-list'>
        {list.map(item => (
          <View
            key={item.id}
            className='cart-list__item'
          >
            <CheckboxItem
              checked={item.checked}
              // 📒 感觉这地方不用写 bind...都箭头函数了 bind this 干啥
              // 📒 看到有说箭头函数会影响性能的...还没明白
              onClick={this.handleUpdateCheck.bind(this, item)}
            />
            <Image
              className='cart-list__item-img'
              src={item.pic}
            />
            <View className='cart-list__item-info'>
              <View className='cart-list__item-title'>
                {!!item.prefix &&
                  <Text className='cart-list__item-title-tag'>{item.prefix}</Text>
                }
                <Text className='cart-list__item-title-name' numberOfLines={1}>
                  {item.itemName}
                </Text>
              </View>

              <View className='cart-list__item-spec'>
                <Text className='cart-list__item-spec-txt'>
                  {item.specList.map(sepc => sepc.specValue).join(' ')}
                </Text>
              </View>

              <View className='cart-list__item-wrap'>
                <Text className='cart-list__item-price'>
                  ¥{item.actualPrice}
                </Text>
                <View className='cart-list__item-num'>
                  <InputNumber
                    num={item.cnt}
                    onChange={this.handleUpdate.bind(this, item)}
                  />
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    )
  }
}
