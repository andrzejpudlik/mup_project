import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { SiMicrosoftacademic } from 'react-icons/si'
import AuthContext from '../context/AuthContext'

function DemandInfo({
  demandActive,
  setDemandActive,
  demandStatus,
  isEditable,
  setIsChangedDemandList,
  demandEditInfo,
  setDemandEditInfo,
  isSubmittingUpdate
}) {
  const { userData } = useContext(AuthContext)
  const [demandInfo, setDemandInfo] = useState([])

  const fetchActiveDemand = async () => {
    if (demandActive) {
      const response = await axios.post('http://localhost:4000/demand_active', {
        who: demandActive.who,
        date: demandActive.date
      })
  
      if (response) {
        setDemandInfo(response.data)
        setDemandEditInfo({ name: response.data.name, quantity: response.data.quantity, cost: response.data.cost })
      }
    }
  }

  const handleUpdateStatus = async () => {
    let dateClosed = new Date().toLocaleString('pl')
    const response = await axios.patch('http://localhost:4000/demand_active_update_status', {
      demandActive,
      status: 'Nieaktywny',
      dateClosed,
      whoClosed: `${userData.firstName} ${userData.lastName}`
    })
    if (response.data.status === 'ok') {
      setDemandActive(null)
      setIsChangedDemandList(true)
    } else {
      alert('Wystąpił błąd, spróbuj ponownie')
    }
  }

  useEffect(() => {
    fetchActiveDemand()
  }, [demandActive, !isSubmittingUpdate])

  return (
    <div className='container-info'>
      <div className='title'>
        <SiMicrosoftacademic />
        <h1>Zapotrzebowanie</h1>
      </div>
      {!demandActive ? null : (
        <>
          <div className='device-info'>
            <div className='device-info-list'>
              <div className='device-category'>
                <p>Ilość:</p>
                <p>Szacunkowy koszt:</p> 
              </div>
              <div className='device-category-item'>
                {!isEditable ? <p>{demandInfo.quantity}</p> : (
                  <input 
                    className=''
                    type="text"
                    value={demandEditInfo.quantity} 
                    onChange={e => setDemandEditInfo({ ...demandEditInfo, quantity: e.target.value })}
                  />
                )}
                {!isEditable ? <p>{demandInfo.cost}</p> : (
                  <input 
                    className=''
                    type="text"
                    value={demandEditInfo.cost} 
                    onChange={e => setDemandEditInfo({ ...demandEditInfo, cost: e.target.value })}
                  />
                )}
              </div>
            </div>
            <div className='device-info-list'>
              <div className='device-category'>
                <p>Wnioskodawca:</p>
                <p>Data wprowadzenia:</p>   
              </div>
              <div className='device-category-item'>
                <p>{demandInfo.whoIntroduced}</p>
                <p>{demandInfo.dateIntroduced}</p>
              </div>
            </div>
          </div>
          <div className='large-info-list'>
            <div className='category-large'>
              <p>Nazwa zapotrzebowania:</p>
              {!isEditable ? <p>{demandInfo.name}</p> : (
                <input 
                  className=''
                  type="text"
                  value={demandEditInfo.name} 
                  onChange={e => setDemandEditInfo({ ...demandEditInfo, name: e.target.value })}
                />
              )}
            </div>
          </div>
          {demandStatus === 'Aktywny' ? (
            <div className='footer-info-inactive'>
              <div className='footer-info'>
                <p>Odrzuć zapotrzebowanie</p>
                <button className='btn-danger' onClick={handleUpdateStatus}>Odrzuć</button>
              </div>
              <div className='footer-info'>
                <p>Zatwierdź zapotrzebowanie</p>
                <button className='btn-primary' onClick={handleUpdateStatus}>Potwierdź</button>
              </div>
            </div>
          ) : (
            <div className='footer-info-inactive'>
              <div className='footer-info'>
                <p>Data zamknięcia:</p>
                <p>{demandInfo.dateClosed}</p>
              </div>
              <div className='footer-info'>
                <p>Kto zamknął:</p>
                <p>{demandInfo.whoClosed}</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default DemandInfo
