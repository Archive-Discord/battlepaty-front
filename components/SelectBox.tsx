import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { UrlCheck } from '@utils/Tools'

interface SelectBoxType {
  name: string,
  id: string|number,
  icon?: string
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

interface DropDownProps {
    selectCallBack: (type: SelectBoxType) => void
    items: SelectBoxType[]
    className?: string
}

const DropDownSelect: React.FC<DropDownProps> = ({selectCallBack, items, className}) => {
  const [selected, setSelected] = useState<SelectBoxType>(items[0])
  useEffect(() => {
    selectCallBack(selected)
  }, [selected])

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className={`mt-1 relative mt-1 w-full ${className}`}>
            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 h-10 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-battlebot-dark dark:border-none">
                <span className="block truncate flex items-center">{selected.icon? (<>
                            {UrlCheck(selected.icon) ? (
                            <img className="h-4 w-4 mr-2" src={selected.icon}/>) : (<i className={selected.icon + " mr-2"}/>)}
                            </>):(null) 
                          }{selected.name}</span>
                <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'> 
                  <i className="fas fa-sort text-gray-400" aria-hidden="true"/>
                </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm dark:bg-battlebot-dark dark:text-white">
                {items.map((items, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9 dark:text-white'
                      )
                    }
                    value={items}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-2 block truncate flex items-center')}
                          > 
                          {items.icon? (<>
                            {UrlCheck(items.icon) ? (
                            <img className="h-4 w-4 mr-2" src={items.icon}/>) : (<i className={items.icon + " mr-2"}/>)}
                            </>):(null) 
                          }{items.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                            >
                            <i className="fas fa-check "aria-hidden="true"/>
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

export default DropDownSelect;